using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Extensions
{
    public static class ApplicationBuilderExtension
    {
        public static void LoadStaticFiles(this IApplicationBuilder app)
        {
            //To load the static files in wwwroot
            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            // To serve a default page from wwwroot without a fully qualified URI
            app.UseDefaultFiles();
            // Serve the static files in wwwroot
            app.UseStaticFiles();
        }
    }
}
