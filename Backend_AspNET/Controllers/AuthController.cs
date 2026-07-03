using Backend_AspNET.Data;
using Backend_AspNET.DTOs;
using Backend_AspNET.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend_AspNET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(UserManager<ApplicationUser> userManager, TokenService tokenService, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            if (string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Password is required.");
            }

            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, "User");

            var token = await _tokenService.GenerateAccessTokenAsync(user);

            return Ok(new { user.Id, user.Email, Token = token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null) 
            { 
                return BadRequest("Invalid email or password."); 
            }

            if (string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Invalid email or password.");
            }

            var response = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!response.Succeeded) { return BadRequest("Invalid email or password."); }

            var token = await _tokenService.GenerateAccessTokenAsync(user);

            return Ok(new
            {
                user.Id,
                user.Email,
                Token = token
            });
        }
    }
}