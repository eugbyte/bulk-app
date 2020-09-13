using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BulkApi.Migrations
{
    public partial class BidStatus_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "98c74c8f-2392-4f76-bb3c-1752160952d2");

            migrationBuilder.AddColumn<bool>(
                name: "IsInCart",
                table: "Bids",
                nullable: false,
                defaultValue: false);

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "fbb952ab-eae8-49e6-b43d-7c57572462ac");

            migrationBuilder.DropColumn(
                name: "IsInCart",
                table: "Bids");

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "CustomerId1", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "98c74c8f-2392-4f76-bb3c-1752160952d2", 0, "", "9c2e7026-29e0-49d3-8375-cf6b0659e05b", 1, null, "john@gmail.com", false, false, null, null, null, null, null, false, "dfa349b6-c98e-4e77-ab11-13b84502ff0e", false, "John" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 10, 3, 1, 19, 48, 784, DateTimeKind.Local).AddTicks(5809));
        }
    }
}
