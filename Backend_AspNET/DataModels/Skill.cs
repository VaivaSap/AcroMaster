using Backend_AspNET.Enums;

namespace Backend_AspNET.DataModels
{
    public class Skill
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Discipline> Disciplines { get; set; }
        public ICollection<MainSkillCategory> Categories { get; set; } 
        public Difficulty Difficulty { get; set; }
        public string? YoutubeUrl { get; set; }
        public ICollection<SkillAttempt>? BestAttempts { get; set; }
        public string? Notes { get; set; }
        public SkillStatus Status { get; set; }
        public List<long>? PrerequisiteSkillIds { get; set; }
        public long? ParentSkillId { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<string>? Tags { get; set; }  
    }
}