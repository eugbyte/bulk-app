using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BulkApi.Services.Auth;
using BulkApi.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BulkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        // POST api/<AuthController>
        [HttpPost("signIn")]
        public async Task<ActionResult<AuthVM>> SignIn(IdentityUser user)
        {
            Console.WriteLine(user);
            AuthVM authVM = new AuthVM();
            authVM.IsAuth = await authService.AuthenticateUser(user.UserName, user.PasswordHash); 

            if (authVM.IsAuth)
            {
                authVM.JWT = await authService.CreateJWT(user.UserName);
                IdentityUser identityUser = await authService.FindUser(user.UserName);
                authVM.Id = identityUser.Id;
                authVM.UserName = identityUser.UserName;
                authVM.Email = identityUser.Email;
            }

            return Ok(authVM);
        }

        [HttpPost("resetPassword")]
        public async Task<ActionResult> ResetPassword(IdentityUser user)
        {
            string newPassword = user.PasswordHash;
            bool result = await authService.ResetPassword(user.Id, newPassword);
            
            return Ok(result);
        }

        // GET: api/<AuthController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        } 

        // PUT api/<AuthController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AuthController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
