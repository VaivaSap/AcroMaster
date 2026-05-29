namespace Backend_AspNET.DataModels
{
    public class SkillAttempt
    {
        public long Id { get; set; }
        public Skill Skill { get; set; }
        public long SkillId { get; set; }
        public string? UserMediaUrl { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
