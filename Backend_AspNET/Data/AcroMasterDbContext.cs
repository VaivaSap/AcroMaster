using Microsoft.EntityFrameworkCore;
using Backend_AspNET.DataModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend_AspNET.Data;

public class AcroMasterDbContext : IdentityDbContext<ApplicationUser>
{
    public AcroMasterDbContext(DbContextOptions<AcroMasterDbContext> options)
        : base(options)
    {
    }

    public DbSet<Skill> Skills { get; set; }
    public DbSet<SkillAttempt> SkillAttempts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); 
    }
}