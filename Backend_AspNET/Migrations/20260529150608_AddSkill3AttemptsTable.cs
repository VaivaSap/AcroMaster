using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_AspNET.Migrations
{
    /// <inheritdoc />
    public partial class AddSkill3AttemptsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkillAttempt_Skills_SkillId",
                table: "SkillAttempt");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SkillAttempt",
                table: "SkillAttempt");

            migrationBuilder.RenameTable(
                name: "SkillAttempt",
                newName: "SkillAttempts");

            migrationBuilder.RenameIndex(
                name: "IX_SkillAttempt_SkillId",
                table: "SkillAttempts",
                newName: "IX_SkillAttempts_SkillId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkillAttempts",
                table: "SkillAttempts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SkillAttempts_Skills_SkillId",
                table: "SkillAttempts",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkillAttempts_Skills_SkillId",
                table: "SkillAttempts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SkillAttempts",
                table: "SkillAttempts");

            migrationBuilder.RenameTable(
                name: "SkillAttempts",
                newName: "SkillAttempt");

            migrationBuilder.RenameIndex(
                name: "IX_SkillAttempts_SkillId",
                table: "SkillAttempt",
                newName: "IX_SkillAttempt_SkillId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkillAttempt",
                table: "SkillAttempt",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SkillAttempt_Skills_SkillId",
                table: "SkillAttempt",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
