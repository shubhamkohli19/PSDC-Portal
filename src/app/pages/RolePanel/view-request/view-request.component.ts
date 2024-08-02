import { Component } from '@angular/core';
import { ViewRequest } from '../../../interfaces/viewRequest';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrl: './view-request.component.css'
})
export class ViewRequestComponent {
  id: string = '';
  networkRequests: ViewRequest[] = [];
  networkRequest: ViewRequest | undefined;

  constructor(private fb: FormBuilder, private router: Router, private dbService: DashboardService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      debugger;
      this.id = navigation.extras.state['id'];
    }
  }

  ngOnInit() {
    debugger;
    this.fetchNetworkRequests();
  }

  fetchNetworkRequests() {
    debugger;
    this.dbService.getViewRequests()
      .subscribe((data: ViewRequest[]) => {
        console.log('Fetched network requests:', data);
        this.networkRequests = data;
        this.networkRequest = this.networkRequests.find(request => request.network_request_id == this.id);
      }, (error) => {
        console.error('Error fetching network requests', error);
      });
  }
}
