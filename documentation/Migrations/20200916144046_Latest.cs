using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BulkApi.Migrations
{
    public partial class Latest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "758226fc-1e8f-4a13-80f6-c6a1d57e959d");

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "b58c9846-faff-4045-bb5c-43a9217211ad", 0, "", "d4fb2c4a-713c-4b30-9720-cfaa73b4d56c", 1, "john@gmail.com", false, false, null, null, null, null, null, false, "a5807e5d-ef71-4e42-8c5d-83c4ced6fb7a", false, "John" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 10, 16, 22, 40, 46, 281, DateTimeKind.Local).AddTicks(381));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "b58c9846-faff-4045-bb5c-43a9217211ad");

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "758226fc-1e8f-4a13-80f6-c6a1d57e959d", 0, "", "b727c229-fc77-4e24-b483-9706b63862b6", 1, "john@gmail.com", false, false, null, null, null, null, null, false, "af7754f0-d41a-4422-a00d-e7b8a6d2b245", false, "John" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 10, 6, 1, 46, 9, 973, DateTimeKind.Local).AddTicks(3952));
        }
    }
}
