using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_AspNET.Migrations
{
    /// <inheritdoc />
    public partial class AddSkillAttemptsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserMedia",
                table: "Skills");

            migrationBuilder.CreateTable(
                name: "SkillAttempt",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillId = table.Column<long>(type: "bigint", nullable: false),
                    UserMediaUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillAttempt", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SkillAttempt_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SkillAttempt_SkillId",
                table: "SkillAttempt",
                column: "SkillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkillAttempt");

            migrationBuilder.AddColumn<string>(
                name: "UserMedia",
                table: "Skills",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
