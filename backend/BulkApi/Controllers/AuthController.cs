using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
            authVM.IsAuthenticated = await authService.AuthenticateUser(user.UserName, user.PasswordHash); 

            if (authVM.IsAuthenticated)
            {
                authVM.JWT = await authService.CreateJWT(user.UserName);
                IdentityUser identityUser = await authService.FindUserByUserName(user.UserName);
                authVM.Id = identityUser.Id;
                authVM.UserName = identityUser.UserName;
                authVM.Email = identityUser.Email;
                authVM.Claims = (await authService.GetClaims(identityUser.Id))
                    .Select((Claim claim) => claim.Value)
                    .ToList();
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

        [HttpPost("createClaim")]
        public async Task<ActionResult> AddClaim(AuthVM authVM)
        {
            string userId = authVM.Id;
            string claimValue = authVM.Claims.First();
            bool isSucceed = await authService.AddClaim(userId, claimValue);
            if (!isSucceed)
            {
                return StatusCode(500);
            }
            return Ok();
        }

        // GET: api/<AuthController>
        [HttpGet("{userName}")]
        public async Task<IdentityUser> GetUser(string userName)
        {
            return await authService.FindUserByUserName(userName);
        } 

        [HttpGet("claims/{userId}")]
        public async Task<List<Claim>> GetClaims(string userId)
        {
            List<Claim> claims = await authService.GetClaims(userId);
            return claims;
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
