import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkRequestService } from '../../../services/network-request.service';

@Component({
  selector: 'app-verify-na-request',
  templateUrl: './verify-na-request.component.html',
  styleUrl: './verify-na-request.component.css'
})

export class VerifyNaRequestComponent implements OnInit{
  userData: any;
  userName: string = '';
  userEmail: string = '';
  remarks: string = '';
  comment: string = '';
  reviewable: boolean = true;

  constructor(private route: ActivatedRoute, private naService: NetworkRequestService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.userData = JSON.parse(decodeURIComponent(params['data']));
        this.userName = this.userData.contactName;
        this.userEmail = this.userData.email;
        this.remarks = this.userData.remarks;
        console.log(this.userData);
      }
    });
    if(this.userData.comment != ""){
      this.reviewable = false;
    }
    
  }

  approveRequest() {
    this.userData.status = "Pending";
    this.userData.comment = this.comment;
    console.log('Request approved with remarks:', this.remarks);
    this.naService.addNetworkRequest(this.userData).subscribe(response => {
      console.log(response);
    })
  }
  
  rejectRequest() {
    this.userData.status = "Rejected";
    this.userData.comment = this.comment;
    console.log('Request rejected with remarks:', this.remarks);
    this.naService.addNetworkRequest(this.userData).subscribe(response => {
      console.log(response);
    })
  }
}