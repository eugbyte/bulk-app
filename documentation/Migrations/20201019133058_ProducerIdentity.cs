using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BulkApi.Migrations
{
    public partial class ProducerIdentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Producers_ProducerId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProducerId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Producers",
                table: "Producers");

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "b58c9846-faff-4045-bb5c-43a9217211ad");

            migrationBuilder.AlterColumn<int>(
                name: "ProducerId",
                table: "Products",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "ProducerId1",
                table: "Products",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProducerId",
                table: "Producers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "Producers",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "AccessFailedCount",
                table: "Producers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "Producers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "Producers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "Producers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecurityStamp",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TwoFactorEnabled",
                table: "Producers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Producers",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Producers",
                table: "Producers",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "67c9f78b-8fb5-49a0-9657-4c8755261766", 0, "", "2cba753c-ca09-4ed6-b888-9b98a1cee056", 1, "john@gmail.com", false, false, null, null, null, null, null, false, "635b468d-126f-463b-bb5d-5431619ef1c7", false, "John" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 11, 19, 21, 30, 58, 97, DateTimeKind.Local).AddTicks(3423));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 1,
                column: "ProducerId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProducerId1",
                table: "Products",
                column: "ProducerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Producers_ProducerId1",
                table: "Products",
                column: "ProducerId1",
                principalTable: "Producers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Producers_ProducerId1",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProducerId1",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Producers",
                table: "Producers");

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: "67c9f78b-8fb5-49a0-9657-4c8755261766");

            migrationBuilder.DropColumn(
                name: "ProducerId1",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "AccessFailedCount",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "SecurityStamp",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "TwoFactorEnabled",
                table: "Producers");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Producers");

            migrationBuilder.AlterColumn<int>(
                name: "ProducerId",
                table: "Products",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProducerId",
                table: "Producers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Producers",
                table: "Producers",
                column: "ProducerId");

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

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 1,
                column: "ProducerId",
                value: 0);

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
                onDelete: ReferentialAction.Cascade);
        }
    }
}
