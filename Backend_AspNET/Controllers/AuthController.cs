using Azure.Core;
using Backend_AspNET.Data;
using Backend_AspNET.DataModels;
using Backend_AspNET.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend_AspNET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Skill>> Register(RegisterRequest request)
        {
            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { user.Id, user.Email });
        }
    }




}