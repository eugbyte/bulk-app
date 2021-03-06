USE [master]
GO
/****** Object:  Database [Bulk]    Script Date: 10/19/2020 10:20:43 PM ******/
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
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 10/19/2020 10:20:43 PM ******/
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
/****** Object:  Table [dbo].[Bids]    Script Date: 10/19/2020 10:20:43 PM ******/
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
 CONSTRAINT [PK_Bids] PRIMARY KEY CLUSTERED 
(
	[BidId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 10/19/2020 10:20:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[NormalizedUserName] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[NormalizedEmail] [nvarchar](max) NULL,
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
	[Address] [nvarchar](max) NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiscountSchemes]    Script Date: 10/19/2020 10:20:43 PM ******/
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
/****** Object:  Table [dbo].[Producers]    Script Date: 10/19/2020 10:20:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[NormalizedUserName] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[NormalizedEmail] [nvarchar](max) NULL,
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
 CONSTRAINT [PK_Producers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 10/19/2020 10:20:43 PM ******/
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201019140740_FixedIdentityDbForConsumerAndProducer', N'3.1.7')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Bids_CustomerId]    Script Date: 10/19/2020 10:20:44 PM ******/
CREATE NONCLUSTERED INDEX [IX_Bids_CustomerId] ON [dbo].[Bids]
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Bids_DiscountSchemeId]    Script Date: 10/19/2020 10:20:44 PM ******/
CREATE NONCLUSTERED INDEX [IX_Bids_DiscountSchemeId] ON [dbo].[Bids]
(
	[DiscountSchemeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_DiscountSchemes_ProductId]    Script Date: 10/19/2020 10:20:44 PM ******/
CREATE NONCLUSTERED INDEX [IX_DiscountSchemes_ProductId] ON [dbo].[DiscountSchemes]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Products_ProducerId]    Script Date: 10/19/2020 10:20:44 PM ******/
CREATE NONCLUSTERED INDEX [IX_Products_ProducerId] ON [dbo].[Products]
(
	[ProducerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Bids]  WITH CHECK ADD  CONSTRAINT [FK_Bids_Customers_CustomerId] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([Id])
GO
ALTER TABLE [dbo].[Bids] CHECK CONSTRAINT [FK_Bids_Customers_CustomerId]
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
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Producers_ProducerId] FOREIGN KEY([ProducerId])
REFERENCES [dbo].[Producers] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Producers_ProducerId]
GO
USE [master]
GO
ALTER DATABASE [Bulk] SET  READ_WRITE 
GO
