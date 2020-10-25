﻿using BulkApi.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using BulkApi.Models;
using BulkApi.Services;
using BulkApi.Services.DiscountSchemes;
using BulkApi.Services.Bids;
using BulkApi.Filters;
using BulkApi.Services.Products;
using BulkApi.Services.Auth;

namespace BulkApi.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static void AddDbContextExtension(this IServiceCollection services, IConfiguration configuration)
        {
            //For local
            string localConnectionString = configuration.GetConnectionString("LocalSQL");

            services.AddDbContext<BulkDbContext>(options =>
                options.UseSqlServer(localConnectionString));
        }

        public static void AddCorsExtension(this IServiceCollection services)
        {
            services.AddCors(c =>
                c.AddPolicy("CorsPolicy", options => options
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()                    
                ));

            // Then on the controller, annotate like so:
            // [EnableCors("CorsPolicy")]

        }

        public static void AddControllersExtension(this IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        }

        public static void AddIdentityExtension(this IServiceCollection services)
        {
            services.AddIdentity<IdentityUser, IdentityRole>((IdentityOptions options) =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 1;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
            })
            .AddEntityFrameworkStores<BulkDbContext>()
            .AddDefaultTokenProviders();
        }

        public static void AddAuthorizationExtension(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("UserPolicy",
                    policy => policy.RequireClaim("USER_CLASS", "PRODUCER"));  //if you want the ROLE claim to only be PRODUCER  
            });
        }

        public static void AddServicesExtension(this IServiceCollection services)
        {
            services.AddTransient(typeof(IDiscountSchemeService), typeof(DiscountSchemeService));
            services.AddTransient(typeof(IBidService), typeof(BidService));
            services.AddTransient(typeof(IProductService), typeof(ProductService));
            services.AddTransient(typeof(IAuthService), typeof(AuthService));
        }

        public static void AddErrorFilterExtension(this IServiceCollection services)
        {
            services.AddMvc(options => {
                options.Filters.Add(new ErrorFilter());
            });
        }

    }
}
