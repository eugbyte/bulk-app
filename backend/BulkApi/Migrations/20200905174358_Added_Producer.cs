using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BulkApi.Migrations
{
    public partial class Added_Producer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Customers_CustomerId1",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_CustomerId1",
                table: "Customers");

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "fbb952ab-eae8-49e6-b43d-7c57572462ac");

            migrationBuilder.DropColumn(
                name: "CustomerId1",
                table: "Customers");

            migrationBuilder.AddColumn<int>(
                name: "ProducerId",
                table: "Products",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Producers",
                columns: table => new
                {
                    ProducerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    ApiUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producers", x => x.ProducerId);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "266d3b51-d374-424e-8cc0-858e2828c38d", 0, "", "eb72d697-e889-4a4d-b2a3-b1f0b3913d2f", 1, "john@gmail.com", false, false, null, null, null, null, null, false, "03c03a9a-55c2-41b4-bbe9-52b286a88879", false, "John" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 10, 6, 1, 43, 58, 291, DateTimeKind.Local).AddTicks(9696));

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProducerId",
                table: "Products",
                column: "ProducerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Producers_ProducerId",
                table: "Products",
                column: "ProducerId",
                principalTable: "Producers",
                principalColumn: "ProducerId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Producers_ProducerId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Producers");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProducerId",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "266d3b51-d374-424e-8cc0-858e2828c38d");

            migrationBuilder.DropColumn(
                name: "ProducerId",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "CustomerId1",
                table: "Customers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "CustomerId1", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "fbb952ab-eae8-49e6-b43d-7c57572462ac", 0, "", "ba51cbf6-484e-44d4-862a-866b2320642b", 1, null, "john@gmail.com", false, false, null, null, null, null, null, false, "a46507b5-a82c-4b40-b583-2cadc9ed6946", false, "John" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 10, 5, 14, 9, 54, 693, DateTimeKind.Local).AddTicks(1242));

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CustomerId1",
                table: "Customers",
                column: "CustomerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Customers_CustomerId1",
                table: "Customers",
                column: "CustomerId1",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
