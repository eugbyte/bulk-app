using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BulkApi.Migrations
{
    public partial class FinalDeliveryCharge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "FinalDeliveryCharge",
                table: "Bids",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "9aa99210-2a65-4a3b-861b-413e64210fae", "57c9ca21-970a-4375-9e79-35a43a427cbe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "8a0bd1d5-9343-4c94-8462-dfa53bdbd682", "a24e481a-4ab4-49be-81d7-6d7b70aaa5af" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 11, 25, 17, 10, 10, 772, DateTimeKind.Local).AddTicks(7355));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinalDeliveryCharge",
                table: "Bids");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "04f366a3-1dd1-424b-8ca6-2489c00933e8", "46a19348-876a-4e4c-866d-68974c5186c2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c4af21cd-b905-4e9c-844b-ae54643044b6", "eb16d07d-b340-4ca4-b4b3-f7c7c0d36ddd" });

            migrationBuilder.UpdateData(
                table: "DiscountSchemes",
                keyColumn: "DiscountSchemeId",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2020, 11, 22, 22, 50, 55, 188, DateTimeKind.Local).AddTicks(2324));
        }
    }
}
