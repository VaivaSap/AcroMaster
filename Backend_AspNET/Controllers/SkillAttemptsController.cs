using Backend_AspNET.Data;
using Backend_AspNET.DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost]
        //Max 150MB
        [RequestSizeLimit(157_286_400)]
        public async Task<IActionResult> UploadPicture([FromForm] IFormFile file, [FromForm] long skillId)
        {
            if (file == null) return BadRequest("No file provided");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".mp4", ".mov", ".webm" };

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension)) return BadRequest("Only image and video files are allowed");

            var fileName = Guid.NewGuid().ToString() + extension;

            var uplPath = _configuration["FileStorage:LocalPath"];
            
            if (uplPath == null) return BadRequest("Upload path does not work");

            var existingCount = await _db.SkillAttempts.Where(a => a.SkillId == skillId).CountAsync();

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
                DateAdded = DateTime.UtcNow
            };

            _db.SkillAttempts.Add(attempt);

            await _db.SaveChangesAsync();

            //url of the newly recorded attempt's file - goes to FE
            return Ok(new { url = "/uploads/" + fileName });
        }

        [HttpGet("{skillId}")]

        public async Task<ActionResult<IEnumerable<SkillAttempt>>> GetAttempts(long skillId)
        {
            var attempts = await _db.SkillAttempts.Where(a => a.SkillId == skillId).ToListAsync();
            return Ok(attempts);
        }

        [HttpDelete("{skillAttemptId}")]

        public async Task<ActionResult> DeleteUploadedAttempt(long skillAttemptId)
        {
            var attempt = await _db.SkillAttempts.FindAsync(skillAttemptId);
            if (attempt == null) return NotFound();

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
    }
}
