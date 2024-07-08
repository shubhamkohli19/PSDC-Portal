using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Pawan_Portal_PSDC.Interfaces;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Pawan_Portal_PSDC.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LoginController : ControllerBase
  {
    private readonly IConfiguration _configuration;

    public LoginController(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    private (Login user, string message) AuthenticateUser(Login user)
    {
      using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
      connection.Open();
      var query = "Exec AuthenticateUser @email = @email, @password = @password";
      var result = connection.QueryFirstOrDefault<dynamic>(query, new { email = user.email, password = user.password });
      connection.Close();

      if (result == null)
      {
        return (null, "An error occurred during authentication.");
      }

      if (result is IDictionary<string, object> resultDict && resultDict.ContainsKey("Result"))
      {
        int errorCode = (int)result.Result;
        if (errorCode == 2)
        {
          return (null, "Email not registered yet. Please sign up first.");
        }
        else if (errorCode == 3)
        {
          return (null, "Incorrect password.");
        }
      }

      var authenticatedUser = new Login
      {
        email = result.email,
        password = result.password,
      };

      return (authenticatedUser, "Success");
    }

    private string GenerateToken(Login users)
    {
      try
      {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], null,
            expires: DateTime.Now.AddMinutes(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);

      }
      catch (Exception ex)
      {
        return ex.ToString();
      }
    }

    [HttpPost("loginUser")]
    public async Task<ActionResult> LoginUser([FromBody] Login user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var (authenticatedUser, message) = AuthenticateUser(user);
      if (authenticatedUser != null)
      {
        var token = GenerateToken(authenticatedUser);
        using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        var query = "EXEC AuthenticateUser @email = @email, @password = @password";
        return Ok(new { token });
      }
      else
      {
        return Conflict(message);
      }
    }
  }
}
