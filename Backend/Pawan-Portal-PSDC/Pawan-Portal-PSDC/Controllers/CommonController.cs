using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Pawan_Portal_PSDC.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CommonController : ControllerBase
  {
    private readonly IConfiguration _configuration;

    public CommonController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    private SqlConnection GetConnection()
    {
      return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }

    [HttpGet("getDepartments")]
    public async Task<ActionResult<IEnumerable<string>>> GetNetworkRequests()
    {
      using var connection = GetConnection();
      var requests = await connection.QueryAsync<string>("Select name from departments where status = 1");
      return Ok(requests);
    }

    [HttpGet("get")]
    public async Task<ActionResult<IEnumerable<string>>> GetNetworkRequest()
    {
      using var connection = GetConnection();
      var requests = await connection.QueryAsync<string>("Select name from departments where status = 1");
      return Ok(requests);
    }
  }
}
