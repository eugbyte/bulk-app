using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BulkApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    CustomerId1 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_Customers_CustomerId1",
                        column: x => x.CustomerId1,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    OriginalPrice = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "DiscountSchemes",
                columns: table => new
                {
                    DiscountSchemeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MinOrderQnty = table.Column<int>(nullable: false),
                    DiscountedPrice = table.Column<double>(nullable: false),
                    ExpiryDate = table.Column<DateTime>(nullable: true),
                    DeliveryCharge = table.Column<double>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountSchemes", x => x.DiscountSchemeId);
                    table.ForeignKey(
                        name: "FK_DiscountSchemes_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bids",
                columns: table => new
                {
                    BidId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(nullable: false),
                    BidSuccessDate = table.Column<DateTime>(nullable: true),
                    CollectionAddress = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false),
                    CustomerId1 = table.Column<string>(nullable: true),
                    DiscountSchemeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bids", x => x.BidId);
                    table.ForeignKey(
                        name: "FK_Bids_Customers_CustomerId1",
                        column: x => x.CustomerId1,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Bids_DiscountSchemes_DiscountSchemeId",
                        column: x => x.DiscountSchemeId,
                        principalTable: "DiscountSchemes",
                        principalColumn: "DiscountSchemeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "CustomerId", "CustomerId1", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "2fa8e23e-bcbb-4419-9dea-3dfe08cbda9a", 0, "", "c98bcef7-b190-4cf4-8895-ab67cb9a3a7b", 1, null, "john@gmail.com", false, false, null, null, null, null, null, false, "a481ab14-d856-429c-812a-8acab116984f", false, "John" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "Category", "Description", "Name", "OriginalPrice" },
                values: new object[] { 1, "Shoe", "white shoe", "Awesome Shoes", 100.0 });

            migrationBuilder.InsertData(
                table: "DiscountSchemes",
                columns: new[] { "DiscountSchemeId", "DeliveryCharge", "DiscountedPrice", "ExpiryDate", "MinOrderQnty", "ProductId" },
                values: new object[] { 1, 10.0, 70.0, new DateTime(2020, 10, 3, 1, 17, 28, 22, DateTimeKind.Local).AddTicks(6928), 5, 1 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "BidId", "BidSuccessDate", "CollectionAddress", "CustomerId", "CustomerId1", "DiscountSchemeId", "Quantity" },
                values: new object[] { 1, null, "AMK MRT", 1, null, 1, 2 });

            migrationBuilder.CreateIndex(
                name: "IX_Bids_CustomerId1",
                table: "Bids",
                column: "CustomerId1");

            migrationBuilder.CreateIndex(
                name: "IX_Bids_DiscountSchemeId",
                table: "Bids",
                column: "DiscountSchemeId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CustomerId1",
                table: "Customers",
                column: "CustomerId1");

            migrationBuilder.CreateIndex(
                name: "IX_DiscountSchemes_ProductId",
                table: "DiscountSchemes",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bids");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "DiscountSchemes");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
