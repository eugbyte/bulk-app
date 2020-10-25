using BulkApi.Data;
using BulkApi.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace BulkApi.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly BulkDbContext db;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;

        public AuthService(BulkDbContext db, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.db = db;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<bool> AuthenticateUser(string username, string password)
        {
            SignInResult result = await signInManager.PasswordSignInAsync(username, password, false, false);
            return result.Succeeded;
        }

        public async Task<bool> ResetPassword(string id, string newPassword)
        {
            IdentityUser user = await userManager.FindByIdAsync(id);
            string token = await userManager.GeneratePasswordResetTokenAsync(user);
            IdentityResult identityResult = await userManager.ResetPasswordAsync(user, token, newPassword);

            if (identityResult.Succeeded)
            {
                return identityResult.Succeeded;
            }            

            AggregateException aggregateException = CreateIdentityException(identityResult);
            throw aggregateException;
        }

        public async Task<bool> SignIn(string username, string password)
        {
            SignInResult result = await signInManager.PasswordSignInAsync(username, password, false, false);
            return result.Succeeded;
        }

        private AggregateException CreateIdentityException(IdentityResult identityResult)
        {
            if (identityResult.Succeeded)
            {
                throw new InvalidOperationException("idetityResult.Errors is null. Not possible to create Exception");
            }
            List<AuthenticationException> authenticationExceptions = identityResult.Errors.Select((IdentityError error) =>
            {
                string message = error.Description + "\n" + error.Code;
                return new AuthenticationException(message);
            }).ToList();

            AggregateException aggregateException = new AggregateException(authenticationExceptions);
            return aggregateException;
        }
    }
}
