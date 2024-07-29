namespace Pawan_Portal_PSDC.Interfaces
{
  public class NetworkMenu
  {
    public int TotalRequests { get; set; }
    public int PendingRequests { get; set; }
    public int ProcessingRequests { get; set; }
    public int ForwardRequests { get; set; }
    public int CompleteRequests { get; set; }
    public int RejectRequests { get; set; }
    public int WithdrawalRequests { get; set; }
  }
}
