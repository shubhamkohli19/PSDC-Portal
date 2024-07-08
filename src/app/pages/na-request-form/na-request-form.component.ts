import { Component, Injectable, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { NetworkRequestService } from './../../services/network-request.service';
import { NetworkRequest } from '../../interfaces/network-request';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-na-request-form',
  templateUrl: './na-request-form.component.html',
  styleUrls: ['./na-request-form.component.css']
})

export class NARequestFormComponent implements OnInit {
  formData: NetworkRequest = {
    id: 0,
    networkRequestId: '',
    contactName: '',
    designation: '',
    departmentName: '',
    deviceType: '',
    contactNo: '',
    floorAddress: '',
    roomNo: '',
    locationTypeId: '',
    locationId: 0,
    address: '',
    siteName: '',
    email: '',
    macIdWired: '',
    macIdWifi: '',
    engineerComment: '',
    engineerId: 0,
    remarks: '',
    comment: '',
    status: '',
    reason: '',
    adhaarNumber: '',
    declaration: '',
    userId: 0,
    userTo: 0,
    roleId: 0,
    officerName: '',
    officerMobile: '',
    officerDesignation: '',
    govtEmailId: '',
    emailVerifiedAt: new Date(),
    isWithdrawal: 0,
    isClosedBy: '',
    requestTime: new Date(),
    forwardTimeEngineer: new Date(),
    forwardTimeHelpdesk: new Date(),
    withdrawalReason: '',
    withdrawalStatus: '',
    withdrawalRequestDate: new Date(),
    withdrawalForwardTimeEngineer: new Date(),
    withdrawalForwardTimeHelpdesk: new Date(),
    withdrawalClosedBy: '',
    duration: '',
    emailStatus: false,
    emailSentTime: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private networkRequestService: NetworkRequestService, private emailService: EmailService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getNetworkRequests().subscribe(response => {
      console.log(response);
      this.departments = response;
    })
  }

  departments !: string[];
  devices = ['Desktop', 'Laptop', 'Tablet', 'Smartphone'];
  locationTypes = [
    { value: 'headquarters', label: 'Headquarters' },
    { value: 'districts', label: 'Districts' },
    { value: 'horizontal', label: 'Horizontal' }
  ];
  durations = ['1 month', '3 months', '6 months', '1 year'];

  districtOptions: { value: number, label: string }[] = [];
  showDistrict = false;



  onSubmit() {
    const emailBody = this.generateUserEmailBody(this.formData);
    const govtMail = this.formData.govtEmailId;
    const userMail = this.formData.email;
    let data: FormData = new FormData();

    if (userMail) {
      data.append("recipient_email", userMail);
    }

    data.append("subject", "Network Access Request Submit Successfully");
    data.append("body", emailBody);
    data.append("sender", "noreply@punjab.gov.in");
    data.append("cc", "legendthe727@gmail.com");

    this.emailService.sendEmail(data).subscribe(response => {
      console.log('Email sent successfully', response);
      this.resetForm();
    }, error => {

      console.error('Error sending email', error);
    });


  }

  // generateOfficerEmailBody(formData: NetworkRequest): string {
  //   return `
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //     </head>
  //     <body>
  //         <div class="container-md col-md-6">
  //             <div class="jumbotron">
  //                 <b>
  //                     <h3 class="h1">Hello Sir!</h3>
  //                 </b>
  //                 <p class="h3">
  //                     <small class="text-muted">Please check the Network Access Request Form detail of user & verify the request.</small>
  //                 </p>
  //                 <hr class="my-4">
  //                 <p class="">
  //                     <small class="text-muted">If you don't verify this network request, then no further action will proceed.</small>
  //                 </p>
  //                 <hr class="my-4">
  //             </div>
  //         </div>
  //         <h1>Network Access Request Form Detail</h1>
  //         <table id="naf" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
  //             <tr>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Network Reference ID</th>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Request User Name</th>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Designation</th>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Contact</th>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Email</th>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Reporting Officer Name</th>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Officer Mobile Number</th>
  //                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Verification Link</th>
  //             </tr>
  //             <tr>
  //                 <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.networkRequestId}</td>
  //                 <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.contactName}</td>
  //                 <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.designation}</td>
  //                 <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.contactNo}</td>
  //                 <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.email}</td>
  //                 <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerName}</td>
  //                 <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerMobile}</td>
  //                 <td><a class="btn btn-dark btn-lg" target="_blank" href="${formData.verificationLink}" role="button">Verify Network Request</a></td>
  //             </tr>
  //         </table>
  //         <br>
  //         <hr class="my-4">
  //         ${formData.networkRequests.map((networkRequest) => `
  //         <h1>Network Access Request Form</h1>
  //         <table id="customers" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
  //             <tr>
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Contact Person Name</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.contactName}</td>
  //             </tr>
  //             <tr style="background-color: #f2f2f2;">
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Designation</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.designation}</td>
  //             </tr>
  //             <tr>
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Department Name</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.departmentName}</td>
  //             </tr>
  //             <tr style="background-color: #f2f2f2;">
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Device Type</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.deviceType}</td>
  //             </tr>
  //             <tr>
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Site Name</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.siteName}</td>
  //             </tr>
  //             <tr style="background-color: #f2f2f2;">
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Floor Address</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.floorAddress}</td>
  //             </tr>
  //             <tr>
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Room No</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.roomNo}</td>
  //             </tr>
  //             <tr style="background-color: #f2f2f2;">
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">District</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.districtName}</td>
  //             </tr>
  //             <tr>
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Location</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.locationName}</td>
  //             </tr>
  //             <tr style="background-color: #f2f2f2;">
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Duration</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.duration}</td>
  //             </tr>
  //             <tr>
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Name</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.officerName}</td>
  //             </tr>
  //             <tr style="background-color: #f2f2f2;">
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Mobile</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.officerMobile}</td>
  //             </tr>
  //             <tr>
  //                 <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Email</th>
  //                 <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${networkRequest.officerEmail}</td>
  //             </tr>
  //         </table>
  //         `).join('')}
  //         <hr class="my-4">
  //         <p class="h5">Regards,</p>
  //         <p class="h5">
  //             <small class="text-muted">Punjab State Wide Area Network (PAWAN)</small>
  //         </p>
  //         <hr class="my-4">
  //         <p class="h5">
  //             Punjab State Wide Area Network (PAWAN):
  //             <small class="text-muted">The Punjab State Wide Area Network (PAWAN) has been established in the year 2010 at the state level primarily to connect various departments.</small>
  //         </p>
  //     </body>
  //     </html>
  //   `;
  // }  

  generateUserEmailBody(formData: NetworkRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head></head>
      <body>
          <div class="container-md col-md-6">
              <div class="jumbotron">
                  <b>
                      <h3 class="h1">Hello!</h3>
                  </b>
                  <p class="h3">
                      <small class="text-muted">Your Network Access Request Form Successfully Submitted.
                          Please wait for some time because your NAF verification is pending with the Reporting Officer.
                      </small>
                  </p>
                  <hr class="my-4">
                  <p>
                      <small class="text-muted">
                          When your request has been approved, you will be notified through email.
                      </small>
                  </p>
                  <hr class="my-4">
              </div>
          </div>
          <h1>Network Access Request Form Details</h1>
          <table id="naf" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
              <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Network Reference ID</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Request User Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Designation</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Contact</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Email</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Reporting Officer Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Officer Mobile Number</th>
              </tr>
              <tr>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.networkRequestId}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.contactName}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.designation}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.contactNo}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.email}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerName}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerMobile}</td>
              </tr>
          </table>
          <hr class="my-4">
          <p>
              Note: This NARF (Network Access Request Form) grants access to the network and associated services. Please remember to withdraw this form in case of transfer, resignation, retirement, or any other situation where you will no longer be responsible for the assigned services. Failure to do so may result in unauthorized access and compromise the security of our network.
          </p>
          <hr class="my-4">
          <p class="h5">Regards,</p>
          <p class="h5">
              <small class="text-muted">Punjab State Wide Area Network (PAWAN)</small>
          </p>
          <hr class="my-4">
          <p class="h5">
              Punjab State Wide Area Network (PAWAN):
              <small class="text-muted">The Punjab State Wide Area Network (PAWAN) was established in 2010 at the state level primarily to connect various departments.</small>
          </p>
      </body>
      </html>
      <div class="container-md col-md-6">
  <div class="jumbotron">
    <b>
      <h3 class="h1">Hello!</h3>
    </b>
    <p class="h3">
      <small class="text-muted">
        Your Network Access Request Form Successfully Submit.
        Please wait for some time because your NAF verification is pending to the Reporting Officer.
      </small>
    </p>
    <hr class="my-4">
    <p class="">
      <small class="text-muted">
        When your request has been approved then you will notify through the email.
      </small>
    </p>
    <hr class="my-4">
  </div>
</div>
<h1>Network Access Request Form Detail</h1>
<table id="naf" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Network Reference ID</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Request User Name</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Designation</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Contact</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Email</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Reporting Officer Name</th>
    <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #09020e; color: white;">Officer Mobile Number</th>
  </tr>
  <tr>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.networkRequestId}</td>
    <td style="background-color: #f2f2f2;border: 1px solid #ddd;">${formData.contactName}</td>
    <td style="background-color: #f2f2f2;border: 1px solid #ddd;">${formData.designation}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.contactNo}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.email}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerName}</td>
    <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerMobile}</td>
  </tr>
</table>
<br>
<hr class="my-4">
<div *ngFor="let formData of formData">
  <h1>Network Access Request Form</h1>
  <table id="customers" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Contact Person Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.contactName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Designation</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.designation}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Department Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.departmentName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; border: 1px solid #ddd; text-align: left; background-color: #04AA6D; color: white;">Device Type</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.deviceType}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Site Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.siteName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Floor Address</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.floorAddress}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Room No</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.roomNo}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">District</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.locationTypeId}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Location</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.locationId}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Duration</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.duration}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Name</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.officerName}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Mobile</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.officerMobile}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; border: 1px solid #ddd; text-align: left; background-color: #04AA6D; color: white;">Officer Email</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.govtEmailId}</td>
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
</p>

    `;
  }

  updateDistrictOptions() {
    const locationType = this.formData.locationTypeId;

    if (locationType === 'headquarters') {
      this.districtOptions = [
        { value: 1, label: 'District' },
        { value: 2, label: 'DGR' },
        { value: 3, label: 'Ferozepur HQ' }
      ];
    } else if (locationType === 'districts') {
      this.districtOptions = [
        { value: 1, label: 'Amritsar' },
        { value: 2, label: 'Barnala' },
        { value: 3, label: 'Bathinda' },
        { value: 4, label: 'Faridkot' },
        { value: 5, label: 'Fatehgarh Sahib' },
        { value: 6, label: 'Fazilka' },
        { value: 7, label: 'Ferozepur' },
        { value: 8, label: 'Gurdaspur' },
        { value: 9, label: 'Hoshiarpur' },
        { value: 10, label: 'Jalandhar' },
        { value: 11, label: 'Kapurthala' },
        { value: 12, label: 'Ludhiana' },
        { value: 13, label: 'Mansa' },
        { value: 14, label: 'Moga' },
        { value: 15, label: 'Muktsar' },
        { value: 16, label: 'Pathankot' },
        { value: 17, label: 'Patiala' },
        { value: 18, label: 'Rupnagar' },
        { value: 19, label: 'Sangrur' },
        { value: 20, label: 'SAS Nagar' },
        { value: 21, label: 'Shahid Bhagat Singh Nagar' },
        { value: 22, label: 'Sri Muktsar Sahib' },
        { value: 23, label: 'Tarn Taran' }
      ];
    } else if (locationType === 'horizontal') {
      this.districtOptions = [
        { value: 1, label: 'Horizontal 1' },
        { value: 2, label: 'Horizontal 2' },
        { value: 3, label: 'Horizontal 3' },
        { value: 4, label: 'Horizontal 4' },
        { value: 5, label: 'Horizontal 5' }
      ];
    }

    this.formData.locationId = this.districtOptions.length > 0 ? this.districtOptions[0].value : 0;

    this.showDistrict = true;
  }

  resetForm() {
    this.formData = {
      id: 0,
      networkRequestId: '',
      contactName: '',
      designation: '',
      departmentName: '',
      deviceType: '',
      contactNo: '',
      floorAddress: '',
      roomNo: '',
      locationTypeId: '',
      locationId: 0,
      address: '',
      siteName: '',
      email: '',
      macIdWired: '',
      macIdWifi: '',
      engineerComment: '',
      engineerId: 0,
      remarks: '',
      comment: '',
      status: '',
      reason: '',
      adhaarNumber: '',
      declaration: '',
      userId: 0,
      userTo: 0,
      roleId: 0,
      officerName: '',
      officerMobile: '',
      officerDesignation: '',
      govtEmailId: '',
      emailVerifiedAt: new Date(),
      isWithdrawal: 0,
      isClosedBy: '',
      requestTime: new Date(),
      forwardTimeEngineer: new Date(),
      forwardTimeHelpdesk: new Date(),
      withdrawalReason: '',
      withdrawalStatus: '',
      withdrawalRequestDate: new Date(),
      withdrawalForwardTimeEngineer: new Date(),
      withdrawalForwardTimeHelpdesk: new Date(),
      withdrawalClosedBy: '',
      duration: '',
      emailStatus: false,
      emailSentTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.showDistrict = false;
    this.districtOptions = [];
  }
}