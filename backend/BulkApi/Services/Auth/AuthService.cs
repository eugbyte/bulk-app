using BulkApi.Data;
using BulkApi.Exceptions;
using BulkApi.Models;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BulkApi.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly BulkDbContext db;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;

        public AuthService(BulkDbContext db, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            this.db = db;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
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

        public async Task<string> CreateJWT(string username)
        {
            IdentityUser authUser = await userManager.FindByNameAsync(username);
            List<Claim> userClaims = await userManager.GetClaimsAsync(authUser) as List<Claim> ?? new List<Claim>();

            string issuerUrl = configuration.GetSection("JWT").GetValue<string>("AzureIssuerUrl2");
            string jwtKeyString = configuration.GetSection("JWT").GetValue<string>("JwtKey");
            byte[] jwtKey = Encoding.UTF8.GetBytes(jwtKeyString);

            //Key and SecurityAlgorithm is to salt and hash the jwt
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(jwtKey);
            SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            //To create the jwt body and signature
            JwtSecurityToken tokenOptions = new JwtSecurityToken(
                issuer: issuerUrl,
                claims: userClaims,
                expires: DateTime.Now.AddMinutes(60),   //expires in 60 minutes
                signingCredentials: signInCredentials);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }

        public async Task<IdentityUser> FindUserByUserName(string userName)
        {
            IdentityUser identityUser = await userManager.FindByNameAsync(userName);
            if (identityUser == null)
            {
                string errorMessage = typeof(IdentityUser).Name + $" with userName {userName} not found";
                throw new EntityNotFoundException(errorMessage);
            }
            return identityUser;
        }

        public async Task<bool> AddClaim(string id, string claimValue)
        {
            IdentityUser identityUser = await userManager.FindByIdAsync(id);
            Claim claim = new Claim(JwtClaimTypes.Role, claimValue);
            IdentityResult identityResult = await userManager.AddClaimAsync(identityUser, claim);
            return identityResult.Succeeded;
        }

        public async Task<List<Claim>> GetClaims(string userId)
        {
            IdentityUser identityUser = await userManager.FindByIdAsync(userId);
            List<Claim> claims = (await userManager.GetClaimsAsync(identityUser)).ToList();
            return claims;
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
