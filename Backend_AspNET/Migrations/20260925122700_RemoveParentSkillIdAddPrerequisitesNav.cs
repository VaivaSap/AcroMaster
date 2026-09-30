using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_AspNET.Migrations
{
    /// <inheritdoc />
    public partial class RemoveParentSkillIdAddPrerequisitesNav : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkillPrerequisites_Skills_PrerequisiteSkillId",
                table: "SkillPrerequisites");

            migrationBuilder.DropColumn(
                name: "ParentSkillId",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "PrerequisiteSkillIds",
                table: "Skills");

            migrationBuilder.AddForeignKey(
                name: "FK_SkillPrerequisites_Skills_PrerequisiteSkillId",
                table: "SkillPrerequisites",
                column: "PrerequisiteSkillId",
                principalTable: "Skills",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkillPrerequisites_Skills_PrerequisiteSkillId",
                table: "SkillPrerequisites");

            migrationBuilder.AddColumn<long>(
                name: "ParentSkillId",
                table: "Skills",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrerequisiteSkillIds",
                table: "Skills",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SkillPrerequisites_Skills_PrerequisiteSkillId",
                table: "SkillPrerequisites",
                column: "PrerequisiteSkillId",
                principalTable: "Skills",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
