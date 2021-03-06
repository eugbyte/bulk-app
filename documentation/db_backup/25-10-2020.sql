USE [master]
GO
/****** Object:  Database [Bulk]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE DATABASE [Bulk]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Bulk', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Bulk.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Bulk_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Bulk_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Bulk] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Bulk].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Bulk] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Bulk] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Bulk] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Bulk] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Bulk] SET ARITHABORT OFF 
GO
ALTER DATABASE [Bulk] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Bulk] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Bulk] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Bulk] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Bulk] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Bulk] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Bulk] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Bulk] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Bulk] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Bulk] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Bulk] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Bulk] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Bulk] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Bulk] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Bulk] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Bulk] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [Bulk] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Bulk] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Bulk] SET  MULTI_USER 
GO
ALTER DATABASE [Bulk] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Bulk] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Bulk] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Bulk] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Bulk] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Bulk] SET QUERY_STORE = OFF
GO
USE [Bulk]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[ApiUrl] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[Discriminator] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bids]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bids](
	[BidId] [int] IDENTITY(1,1) NOT NULL,
	[IsInCart] [bit] NOT NULL,
	[Quantity] [int] NOT NULL,
	[BidSuccessDate] [datetime2](7) NULL,
	[CollectionAddress] [nvarchar](max) NULL,
	[CustomerId] [nvarchar](450) NULL,
	[DiscountSchemeId] [int] NOT NULL,
	[FinalDeliveryCharge] [float] NOT NULL,
 CONSTRAINT [PK_Bids] PRIMARY KEY CLUSTERED 
(
	[BidId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiscountSchemes]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiscountSchemes](
	[DiscountSchemeId] [int] IDENTITY(1,1) NOT NULL,
	[MinOrderQnty] [int] NOT NULL,
	[DiscountedPrice] [float] NOT NULL,
	[ExpiryDate] [datetime2](7) NULL,
	[DeliveryCharge] [float] NOT NULL,
	[ProductId] [int] NOT NULL,
 CONSTRAINT [PK_DiscountSchemes] PRIMARY KEY CLUSTERED 
(
	[DiscountSchemeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 10/25/2020 10:52:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Category] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[OriginalPrice] [float] NOT NULL,
	[ProducerId] [nvarchar](450) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201019142914_FixedIdentityDbForConsumerAndProducer', N'3.1.7')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201022145055_IdentityDbContext_Added', N'3.1.7')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201025091011_FinalDeliveryCharge', N'3.1.7')
GO
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [Name], [ApiUrl], [Address], [Discriminator]) VALUES (N'1', N'TestUser', NULL, N'john@gmail.com', NULL, 0, NULL, N'57c9ca21-970a-4375-9e79-35a43a427cbe', N'9aa99210-2a65-4a3b-861b-413e64210fae', NULL, 0, 0, NULL, 0, 0, NULL, NULL, N'', N'Customer')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [Name], [ApiUrl], [Address], [Discriminator]) VALUES (N'2', N'TestProducer', N'TESTPRODUCER', NULL, NULL, 0, N'AQAAAAEAACcQAAAAEIkEmhfKi5lM2Z4rhhzpOXCsODAEGp7siqvPl0NrrIg9xhGBqkR/Xc9NIcH1IzAvsQ==', N'ACF3FJVI2WQQMAHU3MD2LUC42X2U5ABS', N'9ff91f59-b72d-4082-ac71-d68866430d35', NULL, 0, 0, NULL, 0, 0, NULL, NULL, NULL, N'Producer')
GO
SET IDENTITY_INSERT [dbo].[Bids] ON 

INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1, 0, 2, NULL, N'AMK MRT', N'1', 1, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (2, 0, 2, NULL, N'AMK', N'1', 1, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (3, 0, 3, CAST(N'2020-10-22T23:11:16.1723834' AS DateTime2), N'BISHAN', N'1', 2, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (4, 0, 7, CAST(N'2020-10-22T23:11:16.1723759' AS DateTime2), N'AMK', N'1', 2, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (30, 0, 1, NULL, N'AMK', N'1', 12, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1023, 0, 1, CAST(N'2020-10-18T15:27:27.7284098' AS DateTime2), N'AMK', N'1', 10, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1030, 0, 1, CAST(N'2020-10-18T15:27:27.7284101' AS DateTime2), N'AMK', N'1', 10, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1031, 0, 3, CAST(N'2020-10-18T15:27:27.7283974' AS DateTime2), N'AMK', N'1', 10, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1032, 0, 5, CAST(N'2020-10-24T23:01:02.6994609' AS DateTime2), N'AMK', N'1', 32, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1033, 0, 5, CAST(N'2020-10-24T23:01:02.6994538' AS DateTime2), N'BISHAN', N'1', 32, 0)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1034, 0, 4, CAST(N'2020-10-25T20:35:49.0879122' AS DateTime2), N'AMK', N'1', 30, 3.3333333333333335)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1035, 0, 3, CAST(N'2020-10-25T20:35:49.0879124' AS DateTime2), N'AMK', N'1', 30, 3.3333333333333335)
INSERT [dbo].[Bids] ([BidId], [IsInCart], [Quantity], [BidSuccessDate], [CollectionAddress], [CustomerId], [DiscountSchemeId], [FinalDeliveryCharge]) VALUES (1036, 0, 3, CAST(N'2020-10-25T20:35:49.0879052' AS DateTime2), N'AMK', N'1', 30, 3.3333333333333335)
SET IDENTITY_INSERT [dbo].[Bids] OFF
GO
SET IDENTITY_INSERT [dbo].[DiscountSchemes] ON 

INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (1, 5, 70, CAST(N'2020-11-25T17:10:10.7727355' AS DateTime2), 10, 1)
INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (2, 10, 40, CAST(N'2020-10-23T15:04:00.0000000' AS DateTime2), 7, 2)
INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (10, 5, 170, CAST(N'2021-10-06T00:00:00.0000000' AS DateTime2), 20, 4)
INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (12, 5, 350, CAST(N'2020-10-06T00:00:00.0000000' AS DateTime2), 10, 6)
INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (30, 10, 300, CAST(N'2020-11-30T15:22:00.0000000' AS DateTime2), 10, 6)
INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (31, 2, 150, CAST(N'2020-10-19T07:28:00.0000000' AS DateTime2), 10, 2)
INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (32, 10, 50, CAST(N'2020-10-25T14:57:00.0000000' AS DateTime2), 20, 9)
INSERT [dbo].[DiscountSchemes] ([DiscountSchemeId], [MinOrderQnty], [DiscountedPrice], [ExpiryDate], [DeliveryCharge], [ProductId]) VALUES (33, 10, 40, CAST(N'2020-12-17T12:36:00.0000000' AS DateTime2), 5, 2)
SET IDENTITY_INSERT [dbo].[DiscountSchemes] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (1, N'Awesome Shoes', N'Shoe', N'white shoe', 100, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (2, N'Phone Case', N'IT', N'Protective Cover', 50, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (3, N'Curious Chair', N'Furniture', N'black', 300, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (4, N'Keyboard', N'IT', N'black', 200, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (5, N'Mouse', N'IT', N'some mouse', 77, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (6, N'Camera', N'IT', N'white', 400, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (7, N'Awesome Shoes', N'Shoe', N'white shoe', 100, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (8, N'Tied Tie', N'Tie', N'blue', 200, N'2')
INSERT [dbo].[Products] ([ProductId], [Name], [Category], [Description], [OriginalPrice], [ProducerId]) VALUES (9, N'LipStick', N'Cosmetics', N'Nice lipstick', 70, N'2')
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Bids_CustomerId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Bids_CustomerId] ON [dbo].[Bids]
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Bids_DiscountSchemeId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Bids_DiscountSchemeId] ON [dbo].[Bids]
(
	[DiscountSchemeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_DiscountSchemes_ProductId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_DiscountSchemes_ProductId] ON [dbo].[DiscountSchemes]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Products_ProducerId]    Script Date: 10/25/2020 10:52:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Products_ProducerId] ON [dbo].[Products]
(
	[ProducerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  DEFAULT (N'') FOR [Discriminator]
GO
ALTER TABLE [dbo].[Bids] ADD  DEFAULT ((0.0000000000000000e+000)) FOR [FinalDeliveryCharge]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Bids]  WITH CHECK ADD  CONSTRAINT [FK_Bids_AspNetUsers_CustomerId] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Bids] CHECK CONSTRAINT [FK_Bids_AspNetUsers_CustomerId]
GO
ALTER TABLE [dbo].[Bids]  WITH CHECK ADD  CONSTRAINT [FK_Bids_DiscountSchemes_DiscountSchemeId] FOREIGN KEY([DiscountSchemeId])
REFERENCES [dbo].[DiscountSchemes] ([DiscountSchemeId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Bids] CHECK CONSTRAINT [FK_Bids_DiscountSchemes_DiscountSchemeId]
GO
ALTER TABLE [dbo].[DiscountSchemes]  WITH CHECK ADD  CONSTRAINT [FK_DiscountSchemes_Products_ProductId] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DiscountSchemes] CHECK CONSTRAINT [FK_DiscountSchemes_Products_ProductId]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_AspNetUsers_ProducerId] FOREIGN KEY([ProducerId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_AspNetUsers_ProducerId]
GO
USE [master]
GO
ALTER DATABASE [Bulk] SET  READ_WRITE 
GO
