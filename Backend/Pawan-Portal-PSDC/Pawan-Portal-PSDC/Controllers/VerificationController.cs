using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pawan_Portal_PSDC.Interfaces;
using System.Data.SqlClient;

namespace Pawan_Portal_PSDC.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VerificationController : ControllerBase
  {
    private readonly IConfiguration _configuration;

    public VerificationController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    private SqlConnection GetConnection()
    {
      return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NetworkRequest>> GetNetworkRequest(string id)
    {
      using var connection = GetConnection();
      var request = await connection.QueryFirstOrDefaultAsync<NetworkRequest>("SELECT * FROM NetworkRequests WHERE network_request_id = @Id", new { Id = id });
      if (request == null)
      {
        return NotFound();
      }
      return Ok(request);
    }
  }
}
