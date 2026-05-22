using Backend_AspNET.Data;
using Backend_AspNET.DataModels;
using Backend_AspNET.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
	private readonly AcroMasterDbContext _db;

	public SkillsController(AcroMasterDbContext db)
	{
		_db = db;
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<Skill>>> GetSkills([FromQuery] string? discipline)
	{
        var query = _db.Skills.AsQueryable();

        if (!string.IsNullOrEmpty(discipline) && Enum.TryParse<Discipline>(discipline, out var disciplineEnum))
        {
            query = query.Where(s => s.Disciplines.Contains(disciplineEnum));
        }

        var skills = await _db.Skills.ToListAsync();
		return Ok(skills);
	}

	[HttpPost]
	public async Task<ActionResult<Skill>> AddSkill([FromBody] Skill skill)
	{
        if (!ModelState.IsValid) return BadRequest(ModelState);

		_db.Skills.Add(skill);
        await _db.SaveChangesAsync();
        return Ok(skill);
    }
}