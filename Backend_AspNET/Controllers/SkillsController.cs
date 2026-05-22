using Backend_AspNET.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend_AspNET.DataModels;



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
	public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
	{
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