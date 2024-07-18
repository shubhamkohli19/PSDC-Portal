using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pawan_Portal_PSDC.Interfaces;
using System.Data.SqlClient;

namespace Pawan_Portal_PSDC.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NetworkRequestController : ControllerBase
  {
    private readonly IConfiguration _configuration;

    public NetworkRequestController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    private SqlConnection GetConnection()
    {
      return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NetworkRequest>>> GetNetworkRequests()
    {
      using var connection = GetConnection();
      var requests = await connection.QueryAsync<NetworkRequest>("SELECT * FROM NetworkRequests");
      return Ok(requests);
    }

    [HttpGet("getTotalRequests")]
    public async Task<ActionResult<IEnumerable<int>>> GetTotalRequests()
    {
      using var connection = GetConnection();
      var length = await connection.QuerySingleAsync<int>("SELECT COUNT(*) FROM NetworkRequests");
      return Ok(length);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NetworkRequest>> GetNetworkRequest(int id)
    {
      using var connection = GetConnection();
      var request = await connection.QueryFirstOrDefaultAsync<NetworkRequest>("SELECT * FROM NetworkRequests WHERE Id = @Id", new { Id = id });
      if (request == null)
      {
        return NotFound();
      }
      return Ok(request);
    }

    [HttpGet("checkExistingRequest/{id}")]
    public async Task<ActionResult<NetworkRequest>> CheckExistingRequest(string id)
    {
      using var connection = GetConnection();
      var request = await connection.QueryFirstOrDefaultAsync<bool>("SELECT CASE WHEN EXISTS (SELECT 1 FROM NetworkRequests WHERE network_request_id = @Id) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END;", new { Id = id });
      
      return Ok(request);
    }


    [HttpPost]
    public async Task<ActionResult<NetworkRequest>> PostNetworkRequest([FromBody] NetworkRequest request)
    {
      const string query = @"
                INSERT INTO NetworkRequests ( network_request_id,
                    contact_name, designation, department_id, device_type, contact_no, floorAddress, room_no,
                    location_type_id, location_id, address, site_name, email, mac_id_wired, mac_id_wifi, engineer_comment, engineer_id,
                    remarks, comment, status, reason, adhaar_number, declaration, user_id, user_to, role_id, officer_name, officer_mobile,
                    officer_designation, govt_email_id, email_verified_at, is_withdrawal, is_closed_by, request_time, forward_time_engineer,
                    forward_time_helpdesk, withdrawal_reason, withdrawal_status, withdrawal_request_date, withdrawal_forwardtime_engineer,
                    withdrawal_forwardtime_helpdesk, withdrawal_closed_by, duration, email_status, email_sent_time, created_at, updated_at
                )
                VALUES (
                    @NetworkRequestId, @ContactName, @Designation, @DepartmentId, @DeviceType, @ContactNo, @FloorAddress, @RoomNo,
                    @LocationTypeId, @LocationId, @Address, @SiteName, @Email, @MacIdWired, @MacIdWifi, @EngineerComment, @EngineerId,
                    @Remarks, @Comment, @Status, @Reason, @AdhaarNumber, @Declaration, @UserId, @UserTo, @RoleId, @OfficerName, @OfficerMobile,
                    @OfficerDesignation, @GovtEmailId, @EmailVerifiedAt, @IsWithdrawal, @IsClosedBy, @RequestTime, @ForwardTimeEngineer,
                    @ForwardTimeHelpdesk, @WithdrawalReason, @WithdrawalStatus, @WithdrawalRequestDate, @WithdrawalForwardTimeEngineer,
                    @WithdrawalForwardTimeHelpdesk, @WithdrawalClosedBy, @Duration, @EmailStatus, @EmailSentTime, @CreatedAt, @UpdatedAt
                );";

      using var connection = GetConnection();
      await connection.ExecuteAsync(query, request);


      return CreatedAtAction(nameof(GetNetworkRequest), new { id = request.Id }, request);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutNetworkRequest(int id, [FromBody] NetworkRequest request)
    {
      if (id != request.Id)
      {
        return BadRequest();
      }

      using var connection = GetConnection();
      var query = @"
                UPDATE NetworkRequests
                SET NetworkRequestId = @NetworkRequestId, ContactName = @ContactName, Designation = @Designation, DepartmentId = @DepartmentId, DeviceType = @DeviceType, ContactNo = @ContactNo, FloorAddress = @FloorAddress, RoomNo = @RoomNo, LocationTypeId = @LocationTypeId, LocationId = @LocationId, Address = @Address, SiteName = @SiteName, Email = @Email, MacIdWired = @MacIdWired, MacIdWifi = @MacIdWifi, EngineerComment = @EngineerComment, EngineerId = @EngineerId, Remarks = @Remarks, Comment = @Comment, Status = @Status, Reason = @Reason, AdhaarNumber = @AdhaarNumber, Declaration = @Declaration, UserId = @UserId, UserTo = @UserTo, RoleId = @RoleId, OfficerName = @OfficerName, OfficerMobile = @OfficerMobile, OfficerDesignation = @OfficerDesignation, GovtEmailId = @GovtEmailId, EmailVerifiedAt = @EmailVerifiedAt, IsWithdrawal = @IsWithdrawal, IsClosedBy = @IsClosedBy, RequestTime = @RequestTime, ForwardTimeEngineer = @ForwardTimeEngineer, ForwardTimeHelpdesk = @ForwardTimeHelpdesk, WithdrawalReason = @WithdrawalReason, WithdrawalStatus = @WithdrawalStatus, WithdrawalRequestDate = @WithdrawalRequestDate, WithdrawalForwardTimeEngineer = @WithdrawalForwardTimeEngineer, WithdrawalForwardTimeHelpdesk = @WithdrawalForwardTimeHelpdesk, WithdrawalClosedBy = @WithdrawalClosedBy, Duration = @Duration, EmailStatus = @EmailStatus, EmailSentTime = @EmailSentTime, CreatedAt = @CreatedAt, UpdatedAt = @UpdatedAt
                WHERE Id = @Id";

      var affectedRows = await connection.ExecuteAsync(query, request);
      if (affectedRows == 0)
      {
        return NotFound();
      }

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNetworkRequest(int id)
    {
      using var connection = GetConnection();
      var query = "DELETE FROM NetworkRequests WHERE Id = @Id";
      var affectedRows = await connection.ExecuteAsync(query, new { Id = id });
      if (affectedRows == 0)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}
