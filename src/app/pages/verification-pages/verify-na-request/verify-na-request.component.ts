import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

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
  }

  approveRequest() {
    console.log('Request approved with remarks:', this.remarks);
  }

  rejectRequest() {
    console.log('Request rejected with remarks:', this.remarks);
  }
}