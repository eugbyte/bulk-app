using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using BulkApi.Extensions;
using System.IO;

namespace BulkApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCorsExtension();
            services.AddDbContextExtension(Configuration);
            services.AddIdentityExtension();
            services.AddJWTAuthenticationExtension(Configuration);
            services.AddAuthorizationExtension();
            services.AddServicesExtension();
            services.AddCorsExtension();
            services.AddControllersExtension();
            services.AddErrorFilterExtension();

            services.AddControllersWithGlobalAuthorizationExtension();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.LoadStaticFiles();

            app.UseHttpsRedirection();

            app.UseRouting();

            //To enable cors globally, without having to use [EnableCors("PolicyName")] attribute
            app.UseCors(builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
