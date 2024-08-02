namespace Pawan_Portal_PSDC.Interfaces
{
  public class AssignNetworkTask
  {
    public string network_request_id {  get; set; }
    public Boolean isNetwork { get; set; }
    public Boolean isServer { get; set; }
    public Boolean isStorage { get; set; }
    public Boolean isBackup { get; set; }
  }
}
