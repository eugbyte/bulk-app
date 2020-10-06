using BulkApi.Exceptions;
using BulkApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Filters
{
    public class ErrorFilter : IExceptionFilter
    {
        private readonly ILogger logger;

        public ErrorFilter()
        {

            logger = LoggerFactory.Create(builder => {
                builder.AddConsole();
                builder.AddEventSourceLogger();
            }).CreateLogger("Exception Log");
        }

        public void OnException(ExceptionContext context)
        {
            logger.LogInformation(context.Exception.ToString());
            HttpResponse response = context.HttpContext.Response;
            ApiError apiError = new ApiError(context);
            
            if (context.Exception is EntityNotFoundException)
            {
                response.StatusCode = StatusCodes.Status500InternalServerError;
            } else if (context.Exception is ProductNoCascadeDeleteException)
            {
                response.StatusCode = StatusCodes.Status500InternalServerError;
            } else
            {
                response.StatusCode = StatusCodes.Status500InternalServerError;
                apiError.Message = "An undhandled exception occured " + apiError.Message;
            }

            context.Result = new JsonResult(apiError);


        }
    }
}
