import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.css'
})
export class SelectServiceComponent {
  services = [
    {name: "Network Access Request Form",
     image: "na-request",
     url: "na-request-form"
    },
    {
      name: "DNS Entry Form",
      image: "dns-request",
      url: "dns-request-form"
    },
    {
      name: "Firewall Entry Form",
      image: "firewall-request",
      url: "firewall-request"
    },
    {
      name: "VPN Access Request Form",
      image: "vpn-request",
      url: "vpn-request-form"
    }
  ]

  constructor(private router: Router){}


  redirectTo(url: string){
    this.router.navigate([url]);
  }
}
