namespace Pawan_Portal_PSDC.Interfaces
{
  public class NetworkRequest
  {
    public int Id { get; set; }
    public string NetworkRequestId { get; set; }
    public string ContactName { get; set; }
    public string Designation { get; set; }
    public int? DepartmentId { get; set; }
    public string DeviceType { get; set; }
    public string ContactNo { get; set; }
    public string FloorAddress { get; set; }
    public string RoomNo { get; set; }
    public string LocationTypeId { get; set; }
    public int? LocationId { get; set; }
    public string Address { get; set; }
    public string SiteName { get; set; }
    public string Email { get; set; }
    public string MacIdWired { get; set; }
    public string MacIdWifi { get; set; }
    public string EngineerComment { get; set; }
    public int? EngineerId { get; set; }
    public string Remarks { get; set; }
    public string Comment { get; set; }
    public string Status { get; set; }
    public string Reason { get; set; }
    public string AdhaarNumber { get; set; }
    public string Declaration { get; set; }
    public int? UserId { get; set; }
    public int? UserTo { get; set; }
    public int? RoleId { get; set; }
    public string OfficerName { get; set; }
    public string OfficerMobile { get; set; }
    public string OfficerDesignation { get; set; }
    public string GovtEmailId { get; set; }
    public DateTime? EmailVerifiedAt { get; set; }
    public int? IsWithdrawal { get; set; }
    public string IsClosedBy { get; set; }
    public DateTime? RequestTime { get; set; }
    public DateTime? ForwardTimeEngineer { get; set; }
    public DateTime? ForwardTimeHelpdesk { get; set; }
    public string WithdrawalReason { get; set; }
    public string WithdrawalStatus { get; set; }
    public DateTime? WithdrawalRequestDate { get; set; }
    public DateTime? WithdrawalForwardTimeEngineer { get; set; }
    public DateTime? WithdrawalForwardTimeHelpdesk { get; set; }
    public string WithdrawalClosedBy { get; set; }
    public string Duration { get; set; }
    public bool? EmailStatus { get; set; }
    public DateTime? EmailSentTime { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
  }

  public class DashboardNA
  {
    public string network_request_id { get; set; }
    public string Contact_Name { get; set; }
    public string Designation { get; set; }
    public string Contact_No { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string Status { get; set; }
    public string Officer_Name { get; set; }
    public string Officer_Mobile { get; set; }
    public string Govt_Email_Id { get; set; }
    public string Is_Closed_By { get; set; }
    public DateTime? Created_At { get; set; }
    public bool isCommented { get; set; }
    public bool isNetwork { get; set; }
    public bool isStorage { get; set; }
    public bool isServer { get; set; }
    public bool isBackup { get; set; }
  }

  public class UpdateNetworkRequest
  {
    public string network_request_id { get; set; }
    public string Status { get; set; }
    public string Comment { get; set; }
    public bool isCommented { get; set; }
  }
}
