using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_AspNET.Migrations
{
    /// <inheritdoc />
    public partial class PrerequisitesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SkillPrerequisites",
                columns: table => new
                {
                    SkillId = table.Column<long>(type: "bigint", nullable: false),
                    PrerequisiteSkillId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillPrerequisites", x => new { x.SkillId, x.PrerequisiteSkillId });
                    table.ForeignKey(
                        name: "FK_SkillPrerequisites_Skills_PrerequisiteSkillId",
                        column: x => x.PrerequisiteSkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SkillPrerequisites_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SkillPrerequisites_PrerequisiteSkillId",
                table: "SkillPrerequisites",
                column: "PrerequisiteSkillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkillPrerequisites");
        }
    }
}
