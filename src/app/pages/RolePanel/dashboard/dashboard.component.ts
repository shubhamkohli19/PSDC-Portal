import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { NetworkMenu } from '../../../interfaces/networkMenu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  userData: NetworkMenu | undefined;

  constructor(private dashboardService: DashboardService){
  }
  ngOnInit(): void {
    this.dashboardService.getNetworkMenu().subscribe(response => {
      this.userData = response;
    })
  }
}
