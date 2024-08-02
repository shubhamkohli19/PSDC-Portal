using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pawan_Portal_PSDC.Interfaces;
using System.Data.SqlClient;

namespace Pawan_Portal_PSDC.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DashboardController : ControllerBase
  {
    private readonly IConfiguration _configuration;

    public DashboardController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    private SqlConnection GetConnection()
    {
      return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }

    [HttpGet("getNetworkMenu")]
    public async Task<ActionResult<NetworkMenu>> GetNetworkMenu()
    {
      using var connection = GetConnection();
      var query = @"
        SELECT 
            COUNT(*) AS TotalRequests,
            COUNT(CASE WHEN Status = 'Pending' THEN 1 END) AS PendingRequests,
            COUNT(CASE WHEN Status = 'Processing' THEN 1 END) AS ProcessingRequests,
            COUNT(CASE WHEN Status = 'Forward' THEN 1 END) AS ForwardRequests,
            COUNT(CASE WHEN Status = 'Completed' THEN 1 END) AS CompleteRequests,
            COUNT(CASE WHEN Status = 'Reject' THEN 1 END) AS RejectRequests,
            COUNT(CASE WHEN Status = 'Withdrawl' THEN 1 END) AS WithdrawalRequests
        FROM NetworkRequests";

      var dashboardData = await connection.QueryFirstAsync<NetworkMenu>(query);
      return Ok(dashboardData);
    }

    [HttpGet("getNetworkRequests")]
    public async Task<ActionResult<IEnumerable<DashboardNA>>> GetNetworkRequests()
    {
      using var connection = GetConnection();
      var query = @"
       SELECT [network_request_id] ,[contact_name] ,[designation], [contact_no] ,[address] ,[email] ,[status]  ,[officer_name] ,[officer_mobile]
         ,[govt_email_id], [is_closed_by] ,[created_at], [isCommented] FROM NetworkRequests";

      var dashboardData = await connection.QueryAsync<DashboardNA>(query);
      return Ok(dashboardData);
    }

    [HttpPut("assignNetworkTask")]
    public async Task<IActionResult> PutNetworkRequest(AssignNetworkTask task)
    {
      using var connection = GetConnection();

      var updateFields = new List<string>();
      var parameters = new DynamicParameters();
      parameters.Add("id", task.network_request_id);

      if (task.isNetwork)
      {
        updateFields.Add("isNetwork = 1");
      }
      if (task.isServer)
      {
        updateFields.Add("isServer = 1");
      }
      if (task.isBackup)
      {
        updateFields.Add("isBackup = 1");
      }
      if (task.isStorage)
      {
        updateFields.Add("isStorage = 1");
      }

      if (!updateFields.Any())
      {
        return BadRequest("No fields to update.");
      }

      var query = $"UPDATE NetworkRequests SET {string.Join(", ", updateFields)}, status = 'Processing' WHERE network_request_id = @id";

      var affectedRows = await connection.ExecuteAsync(query, parameters);
      if (affectedRows == 0)
      {
        return NotFound();
      }

      return NoContent();
    }

    [HttpPut("addEngineerComment")]
    public async Task<IActionResult> PutNetworkRequest(AddEngineerComment comment)
    {
      using var connection = GetConnection();

      var parameters = new DynamicParameters();
      parameters.Add("id", comment.network_request_id);
      parameters.Add("comment", comment.comment);

      var query = $"UPDATE NetworkRequests SET engineer_comment = @comment, isCommented = 1 WHERE network_request_id = @id";

      var affectedRows = await connection.ExecuteAsync(query, parameters);
      if (affectedRows == 0)
      {
        return NotFound();
      }

      return NoContent();
    }

    [HttpPut("engineerResolved")]
    public async Task<IActionResult> PutNetworkRequest(string id)
    {
      using var connection = GetConnection();

      var parameters = new DynamicParameters();
      parameters.Add("id", id);

      var query = $"UPDATE NetworkRequests SET status = 'Forward' WHERE network_request_id = @id";

      var affectedRows = await connection.ExecuteAsync(query, parameters);
      if (affectedRows == 0)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}
