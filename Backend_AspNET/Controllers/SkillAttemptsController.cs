using Backend_AspNET.Data;
using Backend_AspNET.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend_AspNET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillAttemptsController: ControllerBase
    {
        private readonly AcroMasterDbContext _db;
        private readonly IConfiguration _configuration;

        public SkillAttemptsController(AcroMasterDbContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        [Authorize]
        [HttpPost]
        //Max 150MB
        [RequestSizeLimit(157_286_400)]
        public async Task<IActionResult> UploadPicture([FromForm] IFormFile file, [FromForm] long skillId, [FromForm] string? notes)
        {
            if (file == null) return BadRequest("No file provided");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".mp4", ".mov", ".webm" };

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension)) return BadRequest("Only image and video files are allowed");

            var fileName = Guid.NewGuid().ToString() + extension;

            var uplPath = _configuration["FileStorage:LocalPath"];
            
            if (uplPath == null) return BadRequest("Upload path does not work");

            var skillAttempts = _db.SkillAttempts.Where(a => a.SkillId == skillId);
            
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var ownedSkill = await GetOwnedSkill(skillId, userId);
            if (ownedSkill == null) return NotFound();

            var existingCount = await skillAttempts.CountAsync();

            if (existingCount >= 3)
            {
                return BadRequest("Maximum 3 recorded attempts allowed per skill");
            }

            var filePath = Path.Combine(uplPath, fileName);

            using(var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var attempt = new SkillAttempt
            {
                SkillId = skillId,
                UserMediaUrl = "/uploads/" + fileName,
                Notes = notes,
                DateAdded = DateTime.UtcNow
            };

            _db.SkillAttempts.Add(attempt);

            await _db.SaveChangesAsync();

            //url of the newly recorded attempt's file - goes to FE
            return Ok(new { url = "/uploads/" + fileName });
        }

        [Authorize]
        [HttpGet("{skillId}")]

        public async Task<ActionResult<IEnumerable<SkillAttempt>>> GetAttempts(long skillId)
        {
            var attempts = await _db.SkillAttempts.Where(a => a.SkillId == skillId).ToListAsync();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var ownedSkill = await GetOwnedSkill(skillId, userId);
            if (ownedSkill == null) return NotFound();

            return Ok(attempts);
        }

        [Authorize]
        [HttpDelete("{skillAttemptId}")]

        public async Task<ActionResult> DeleteUploadedAttempt(long skillAttemptId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var attempt = await _db.SkillAttempts.FindAsync(skillAttemptId);
            if (attempt == null) return NotFound();

            var ownedSkill = await GetOwnedSkill(attempt.SkillId, userId);
            if (ownedSkill == null) return NotFound();

            var uplPath = _configuration["FileStorage:LocalPath"];
            var fileName = Path.GetFileName(attempt.UserMediaUrl);
            var filePath = Path.Combine(uplPath, fileName);

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            _db.SkillAttempts.Remove(attempt);
            await _db.SaveChangesAsync();
            return Ok();
        }

        private async Task<Skill?> GetOwnedSkill(long skillId, string userId)
        {
            var skill = await _db.Skills.FindAsync(skillId);
            if (skill == null || skill.UserId != userId) return null;
            return skill;
        }
    }
}
