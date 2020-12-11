using BulkApi.Data;
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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using System.Security.Claims;

namespace BulkApi.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static void AddDbContextExtension(this IServiceCollection services, IConfiguration configuration)
        {
            //For local
            string localConnectionString = configuration.GetConnectionString("LocalSQL");
            string azureConnectionString = configuration.GetConnectionString("Azure");
            string dockerConnectionString2 = configuration.GetConnectionString("DockerSQL2");

            services.AddDbContext<BulkDbContext>(options =>
                options.UseSqlServer(localConnectionString));
        }

        public static void AddCorsExtension(this IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            //services.AddCors(c =>
            //    c.AddPolicy("CorsPolicy", options => options
            //        .AllowAnyOrigin()
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()                    
            //    ));

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
                options.AddPolicy("ConsumerPolicy",
                    policy => policy.RequireClaim(ClaimTypes.Role, "CONSUMER"));
                options.AddPolicy("ProducerPolicy",
                    policy => policy.RequireClaim(ClaimTypes.Role, "PRODUCER"));
            });
        }

        public static void AddJWTAuthenticationExtension(this IServiceCollection services, IConfiguration configuration)
        {

            string issuerUrl = configuration.GetSection("JWT").GetValue<string>("LocalhostIssuerUrl");
            string jwtKeyString = configuration.GetSection("JWT").GetValue<string>("JwtKey");
            byte[] jwtKey = Encoding.UTF8.GetBytes(jwtKeyString);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(jwtKey),

                    ValidateIssuer = false, // ValidateIssuer requirement is not working as expected when deployed to azure. Set to false for now
                    ValidIssuer = issuerUrl,

                    ValidateLifetime = false,   // ValidateLifetime requirement is not working as expected when deployed to azure. Set to false for now
                    ClockSkew = TimeSpan.FromMinutes(60)

                };
            });
        }

        //Apply the authorization policy to all controllers by default
        public static void AddControllersWithGlobalAuthorizationExtension(this IServiceCollection services)
        {
            services.AddControllers(options => {
                AuthorizationPolicy policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .RequireClaim(ClaimTypes.Role)    
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
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
