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
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var query = _db.Skills.Where(s => s.UserId == userId);

        if (!string.IsNullOrEmpty(discipline) && Enum.TryParse<Discipline>(discipline, out var disciplineEnum))
        {
            query = query.Where(s => s.Disciplines.Contains(disciplineEnum));
        }

        var skills = await query.ToListAsync();
		return Ok(skills);
	}

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Skill>> GetSkillById(long id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var skill = await _db.Skills.FindAsync(id);

        if (skill == null) return NotFound();
        if (skill.UserId != userId) return NotFound();
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

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        skill.UserId = userId;
        _db.Entry(skill).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return Ok(skill);
    }

    [Authorize]
    [HttpPut("{skillId}/prerequisites")]

    public async Task<ActionResult<Skill>> AddPrerequisites(long skillId, [FromBody] List<long> prerequisiteIds)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var skill = await _db.Skills.FirstOrDefaultAsync(s => s.Id == skillId && s.UserId == userId);
        if (skill == null) return BadRequest();

        var currentPrerequisites = await _db.SkillPrerequisites
            .Where(sp => sp.SkillId == skillId)
            .Select(sp => sp.PrerequisiteSkillId)
            .ToListAsync();

        var toAdd = prerequisiteIds.Except(currentPrerequisites);
        var toRemove = currentPrerequisites.Except(prerequisiteIds); 

        var newRows = toAdd.Select(id => new SkillPrerequisite
        {
            SkillId = skillId,
            PrerequisiteSkillId = id
        });
        _db.SkillPrerequisites.AddRange(newRows);

        var rowsToRemove = await _db.SkillPrerequisites
       .Where(sp => sp.SkillId == skillId && toRemove.Contains(sp.PrerequisiteSkillId))
       .ToListAsync();

        _db.SkillPrerequisites.RemoveRange(rowsToRemove);

        await _db.SaveChangesAsync();
        var updatedPrerequisites = await _db.SkillPrerequisites
         .Where(sp => sp.SkillId == skillId)
         .Select(sp => sp.PrerequisiteSkillId)
         .ToListAsync();

        return Ok(updatedPrerequisites);
    }
}