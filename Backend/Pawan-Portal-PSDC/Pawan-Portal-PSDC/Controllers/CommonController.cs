using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pawan_Portal_PSDC.Interfaces;
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
    public async Task<ActionResult<IEnumerable<Department>>> GetNetworkRequests()
    {
      using var connection = GetConnection();
      var requests = await connection.QueryAsync<Department>("Select id, name from departments where status = 1");
      return Ok(requests);
    }

    [HttpGet("getCategoryWithTypes")]
    public async Task<ActionResult<IEnumerable<CategoryWithTypes>>> GetCategoryWithTypes()
    {
      using var connection = GetConnection();
      var requests = await connection.QueryAsync<CategoryWithTypes>("Select id, name, type_id from categoryWithTypes");
      return Ok(requests);
    }

    [HttpGet("getLocations")]
    public async Task<ActionResult<IEnumerable<Locations>>> GetLocations()
    {
      using var connection = GetConnection();
      var requests = await connection.QueryAsync<Locations>("Select id, name, status, type_id, categorywithtype_id from locations");
      return Ok(requests);
    }
  }
}
