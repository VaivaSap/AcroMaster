namespace Backend_AspNET.DataModels
{
    public class SkillPrerequisite
    {
        public Skill Skill { get; set; }
        public long SkillId { get; set; }
        public Skill PrerequisiteSkill { get; set; }
        public long PrerequisiteSkillId { get; set; } 
    }
}
