using Backend_AspNET.Data;
using Backend_AspNET.DataModels;
using Microsoft.AspNetCore.Mvc;

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

        public async Task<IActionResult> UploadPicture([FromForm] IFormFile file, [FromForm] long skillId)
        {
            if (file == null) return BadRequest("No file provided");

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var uplPath = _configuration["FileStorage:LocalPath"];
            
            if (uplPath == null) return BadRequest("Upload path does not work");

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
    }
}
