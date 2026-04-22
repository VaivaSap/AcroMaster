using Backend_AspNET.Data;
using Microsoft.EntityFrameworkCore;
using Backend_AspNET.DataModels;
using Backend_AspNET.Enums;

Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AcroMasterDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AcroMasterDbContext>();

    db.Database.Migrate();

    if (!db.Skills.Any())
    {
        db.Skills.AddRange(
           new Skill
           {
               Name = "Martini static",
               Disciplines = new List<Discipline> { Discipline.Pole },
               Categories = new List<MainSkillCategory> { MainSkillCategory.Strength },
               Difficulty = Difficulty.Beginner,
               Status = SkillStatus.Learning,
               CreatedAt = DateTime.UtcNow
           }
        );

        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();

app.UseCors("AllowReact");
app.MapControllers();
app.Run();
