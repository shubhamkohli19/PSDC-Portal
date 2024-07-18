import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkRequestService } from '../../../services/network-request.service';
import { EmailService } from '../../../services/email.service';

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

  constructor(private route: ActivatedRoute, private naService: NetworkRequestService, private emailService: EmailService) {}

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
    this.naService.checkExistingRequest(this.userData.networkRequestId).subscribe(response => {
      this.reviewable = response;
      console.log(response);
    });
    
  }
  
  generateUserApproveEmail(userData: any) {
    return `<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <div class="container-md col-md-6">
        <div class="jumbotron">
            <b>
                <h3 class="h1">Hello!</h3>
            </b>
            <p class="h3">
                <small class="text-muted">You'r Network Access Request Form Approved.
                    But please wait for some time because your further proceeding is pending to the related officers.
                </small>
            </p>
            <hr class="my-4">
            <p>
                <small class="text-muted">
                    When your request has been completed then you will notify through the email.
                </small>
            </p>
            <hr class="my-4">
        </div>
    </div>

    <h1>Network Access Request Form Approved Detail</h1>
<table id="naf" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Network Reference ID</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Request User Name</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Designation</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Comment by Officer</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Request Status</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Verified Date</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Approved Officer Name</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Officer Mobile Number</th>
  </tr>
  <tr>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.networkRequestId}</td>
    <td style="background-color: #f2f2f2;border: 1px solid #ddd;">${userData.contactName}</td>
    <td style="background-color: #f2f2f2;border: 1px solid #ddd;">${userData.designation}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.comment}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.status}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.emailVerifiedAt}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.officerName}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.officerMobile}</td>
  </tr>
</table>
<br>
<hr class="my-4">
<div *ngFor="let formData of formData">
  <h1>Network Access Request Form</h1>
  <table id="customers" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Contact Person Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.contactName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Designation</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.designation}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Department Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.departmentId}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; border: 1px solid #ddd; text-align: left; background-color: #04AA6D; color: white;">Device Type</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.deviceType}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Site Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.siteName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Floor Address</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.floorAddress}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Room No</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.roomNo}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">District</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.district}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Location</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.location}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Duration</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.duration}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.officerName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Mobile</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.officerMobile}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; border: 1px solid #ddd; text-align: left; background-color: #04AA6D; color: white;">Officer Email</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.govtEmailId}</td>
    </tr>
  </table>
</div>
<hr class="my-4">
<p>
  Note: This NARF (Network Access Request Form) grants access to the network and the services associated with it. Please remember to withdraw this form in case of transfer, resignation, retirement, or any other situation where you will no longer be responsible for the assigned services. Failure to do so may result in unauthorized access and compromise the security of our network
</p>
<hr class="my-4">
<p class="h5"> Regards, </p>
<p class="h5">
  <small class="text-muted"> Punjab State Wide Area Network (PAWAN) </small>
</p>
<hr class="my-4">
<p class="h5">
  Punjab State Wide Area Network (PAWAN) :
  <small class="text-muted"> The Punjab State Wide Area Network (PAWAN) has been established in the year 2010 at the state level primarily to connect various departments.
  </small>
</p>`;
  }

  generateUserRejectEmail(userData: any) {
    return `<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <div class="container-md col-md-6">
        <div class="jumbotron">
            <b>
                <h3 class="h1">Hello!</h3>
            </b>
            <p class="h3">
                <small class="text-muted">You'r Network Access Request Form Rejected.
                    Please apply again to the Network Request Form, because your application has been rejected.
                </small>
            </p>
            <hr class="my-4">
            <p>
                <small class="text-muted">
                    When your request has been completed then you will notify through the email.
                </small>
            </p>
            <hr class="my-4">
        </div>
    </div>

    <h1>Network Access Request Form Rejected Detail</h1>
<table id="naf" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Network Reference ID</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Request User Name</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Designation</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Comment by Officer</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Request Status</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Rejected Officer Name</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Officer Mobile Number</th>
  </tr>
  <tr>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.networkRequestId}</td>
    <td style="background-color: #f2f2f2;border: 1px solid #ddd;">${userData.contactName}</td>
    <td style="background-color: #f2f2f2;border: 1px solid #ddd;">${userData.designation}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.comment}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.status}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.officerName}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${userData.officerMobile}</td>
  </tr>
</table>
<br>
<hr class="my-4">
<div *ngFor="let formData of formData">
  <h1>Network Access Request Form</h1>
  <table id="customers" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Contact Person Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.contactName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Designation</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.designation}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Department Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.departmentId}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; border: 1px solid #ddd; text-align: left; background-color: #04AA6D; color: white;">Device Type</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.deviceType}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Site Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.siteName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Floor Address</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.floorAddress}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Room No</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.roomNo}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">District</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.district}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Location</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.location}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Duration</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.duration}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.officerName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Mobile</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.officerMobile}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; border: 1px solid #ddd; text-align: left; background-color: #04AA6D; color: white;">Officer Email</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${userData.govtEmailId}</td>
    </tr>
  </table>
</div>
<hr class="my-4">
<p>
  Note: This NARF (Network Access Request Form) grants access to the network and the services associated with it. Please remember to withdraw this form in case of transfer, resignation, retirement, or any other situation where you will no longer be responsible for the assigned services. Failure to do so may result in unauthorized access and compromise the security of our network
</p>
<hr class="my-4">
<p class="h5"> Regards, </p>
<p class="h5">
  <small class="text-muted"> Punjab State Wide Area Network (PAWAN) </small>
</p>
<hr class="my-4">
<p class="h5">
  Punjab State Wide Area Network (PAWAN) :
  <small class="text-muted"> The Punjab State Wide Area Network (PAWAN) has been established in the year 2010 at the state level primarily to connect various departments.
  </small>
</p>`;
  }

  approveRequest() {
    this.userData.status = "Pending";
    this.userData.comment = this.comment;
    console.log('Request approved with remarks:', this.remarks);
    this.naService.addNetworkRequest(this.userData).subscribe(response => {
      console.log(response);
    })

    const userMail = this.userData.email;
    const userMailBody = this.generateUserApproveEmail(this.userData);
    let userMailData: FormData = new FormData();
    
    if (userMail) {
      userMailData.append("recipient_email", userMail);
    }
    userMailData.append("subject", "Network Access Request Approved");
    userMailData.append("body", userMailBody);
    userMailData.append("sender", "noreply@punjab.gov.in");
    userMailData.append("cc", "legendthe727@gmail.com");

    this.emailService.sendEmail(userMailData).subscribe(response => {
      console.log('Email sent successfully', response);
    }, error => {
      console.error('Error sending email', error);
    });    
    this.reviewable = true;
  }

  rejectRequest() {
    this.userData.status = "Rejected";
    this.userData.comment = this.comment;
    console.log('Request rejected with remarks:', this.remarks);
    this.naService.addNetworkRequest(this.userData).subscribe(response => {
      console.log(response);
    })

    const userMail = this.userData.email;
    const userMailBody = this.generateUserRejectEmail(this.userData);
    let userMailData: FormData = new FormData();
    
    if (userMail) {
      userMailData.append("recipient_email", userMail);
    }
    userMailData.append("subject", "Network Access Request Rejected");
    userMailData.append("body", userMailBody);
    userMailData.append("sender", "noreply@punjab.gov.in");
    userMailData.append("cc", "legendthe727@gmail.com");

    this.emailService.sendEmail(userMailData).subscribe(response => {
      console.log('Email sent successfully', response);
    }, error => {
      console.error('Error sending email', error);
    });
    this.reviewable = true;
  }
}