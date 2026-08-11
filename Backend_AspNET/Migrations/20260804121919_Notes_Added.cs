using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_AspNET.Migrations
{
    /// <inheritdoc />
    public partial class Notes_Added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "SkillAttempts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "SkillAttempts");
        }
    }
}
