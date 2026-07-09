using Backend_AspNET.Data;
using Backend_AspNET.DataModels;
using Backend_AspNET.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;



[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
	private readonly AcroMasterDbContext _db;

	public SkillsController(AcroMasterDbContext db)
	{
		_db = db;
	}

    [Authorize]
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

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Skill>> GetSkillById(long id)
    {
        var skill = await _db.Skills.FindAsync(id);

        if (skill == null) return NotFound();

        return Ok(skill);
    }

    [Authorize]
    [HttpPost]
	public async Task<ActionResult<Skill>> AddSkill([FromBody] Skill skill)
	{
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        skill.UserId = userId;
        _db.Skills.Add(skill);
        await _db.SaveChangesAsync();
        return Ok(skill);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<Skill>> UpdateSkill(long id, [FromBody] Skill skill)
	{
        if (id != skill.Id) return BadRequest();
        if (!ModelState.IsValid) return BadRequest(ModelState);

        _db.Entry(skill).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return Ok(skill);
    }
}