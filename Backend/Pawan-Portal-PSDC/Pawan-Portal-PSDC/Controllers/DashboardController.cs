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
                    COUNT(CASE WHEN Status = 'Rejected' THEN 1 END) AS RejectRequests,
                    COUNT(CASE WHEN Status = 'Withdrawl' THEN 1 END) AS WithdrawalRequests
                FROM NetworkRequests";

      var dashboardData = await connection.QueryFirstAsync<NetworkMenu>(query);
      return Ok(dashboardData);
    }

    [HttpGet("getNetworkRequests")]
    public async Task<ActionResult<DashboardNA[]>> GetNetworkRequests()
    {
      using var connection = GetConnection();
      var query = @"
               SELECT [network_request_id] ,[contact_name] ,[designation], [contact_no] ,[address] ,[email] ,[status]  ,[officer_name] ,[officer_mobile]
                 ,[govt_email_id], [is_closed_by] ,[created_at] FROM NetworkRequests";

      var dashboardData = await connection.QueryFirstAsync<DashboardNA[]>(query);
      return Ok(dashboardData);
    }
  }
}
