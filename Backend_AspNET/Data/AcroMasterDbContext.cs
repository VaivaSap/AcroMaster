using Microsoft.EntityFrameworkCore;
using Backend_AspNET.DataModels;

namespace Backend_AspNET.Data;

public class AcroMasterDbContext : DbContext
{
    public AcroMasterDbContext(DbContextOptions<AcroMasterDbContext> options)
        : base(options)
    {
    }

    public DbSet<Skill> Skills { get; set; }
    public DbSet<SkillAttempt> SkillAttempts { get; set; }
}