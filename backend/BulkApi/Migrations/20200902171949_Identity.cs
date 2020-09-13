using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BulkApi.Migrations
{
    public partial class Identity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "2fa8e23e-bcbb-4419-9dea-3dfe08cbda9a");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "98c74c8f-2392-4f76-bb3c-1752160952d2");

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "CustomerId1", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "2fa8e23e-bcbb-4419-9dea-3dfe08cbda9a", 0, "", "c98bcef7-b190-4cf4-8895-ab67cb9a3a7b", 1, null, "john@gmail.com", false, false, null, null, null, null, null, false, "a481ab14-d856-429c-812a-8acab116984f", false, "John" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 10, 3, 1, 17, 28, 22, DateTimeKind.Local).AddTicks(6928));
        }
    }
}
