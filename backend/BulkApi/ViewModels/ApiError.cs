using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.ViewModels
{
    public class ApiError
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string InnerException { get; set; }

        public ApiError()
        {
        }
        public ApiError(ExceptionContext context)
        {
            Name = context.Exception.GetType().ToString();
            Path = context.HttpContext.Request.Path;
            Message = context.Exception.Message;
            StackTrace = context.Exception.StackTrace;
            InnerException = context.Exception?.InnerException?.Message;
            
        }
    }
}
