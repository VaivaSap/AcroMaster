using Microsoft.EntityFrameworkCore;
using Backend_AspNET.DataModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Backend_AspNET.Data;

public class AcroMasterDbContext : IdentityDbContext<ApplicationUser>
{
    public AcroMasterDbContext(DbContextOptions<AcroMasterDbContext> options)
        : base(options)
    {
    }

    public DbSet<Skill> Skills { get; set; }
    public DbSet<SkillAttempt> SkillAttempts { get; set; }
    public DbSet<SkillPrerequisite> SkillPrerequisites { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<SkillPrerequisite>(entity =>
        {
            entity.HasKey(sp => new { sp.SkillId, sp.PrerequisiteSkillId });

            entity.HasOne(sp => sp.Skill)
                .WithMany()
                .HasForeignKey(sp => sp.SkillId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(sp => sp.PrerequisiteSkill)
                .WithMany()
                .HasForeignKey(sp => sp.PrerequisiteSkillId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}