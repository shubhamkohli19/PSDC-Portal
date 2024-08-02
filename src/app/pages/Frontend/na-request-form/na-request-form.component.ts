import { Component, Injectable, OnInit } from '@angular/core';
import { EmailService } from '../../../services/email.service';
import { NetworkRequestService } from '../../../services/network-request.service';
import { NetworkRequest } from '../../../interfaces/network-request';
import { SharedService } from '../../../services/shared.service';
import { CategoryWithTypes, Locations } from '../../../interfaces/common';
import { Department } from '../../../interfaces/department';

@Component({
  selector: 'app-na-request-form',
  templateUrl: './na-request-form.component.html',
  styleUrls: ['./na-request-form.component.css']
})

export class NARequestFormComponent implements OnInit {
  clickedDistObject : CategoryWithTypes | undefined;
  districtName : string | undefined;
  categories!: CategoryWithTypes[];
  departments !: Department[];
  locations !: Locations[];
  filteredLocations !: Locations[];
  networkId !: string;
  displaySuccess: boolean = false;
  devices = ['Desktop', 'Laptop', 'Tablet', 'Smartphone'];
  durations = ['1 month', '3 months', '6 months', '1 year'];
  locationTypes = [
    { value: 1, label: 'Headquarters' },
    { value: 2, label: 'Districts' },
    { value: 3, label: 'Horizontal' }
  ];
  len: number = 0;
  districtOptions: CategoryWithTypes[] = [];
  showDistrict = false;
  showLocation = false;
  clickedDistrictObject: CategoryWithTypes | undefined;
  clickedLocationObject: Locations | undefined;
  selectedDistrictShortName: string = '';
  selectedLocationShortName: string = '';

  formData: NetworkRequest = {
    id: 0,
    networkRequestId: '',
    contactName: '',
    designation: '',
    departmentId: 0,
    deviceType: '',
    contactNo: '',
    floorAddress: '',
    roomNo: '',
    locationTypeId: '',
    district: '',
    location: '',
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
    this.sharedService.getDepartments().subscribe(response => {
      this.departments = response;
    });
    this.sharedService.getCategoryWithTypes().subscribe(response => {
      this.categories = response;
    });
    this.sharedService.getLocations().subscribe(response => {
      this.locations = response;
    });
    this.networkRequestService.getTotalRequests().subscribe(response=> {
      this.len = response + 1;
    })
  }

  onSubmit() {
    
    this.networkRequestService.getTotalRequests().subscribe(response=> {
      this.len = response + 1;
    })

    const year = new Date().getFullYear();
    this.formData.networkRequestId = `${this.selectedDistrictShortName}-${this.selectedLocationShortName}-${year}-${this.len.toString()}`;
    if(this.formData.networkRequestId){
      this.networkId = this.formData.networkRequestId;
      this.displaySuccess = true;
    }
    console.log(this.formData.networkRequestId);
    
    const userMail = this.formData.email;
    const userMailBody = this.generateUserEmailBody(this.formData, this.districtName);
    let userMailData: FormData = new FormData();
    
    if (userMail) {
      userMailData.append("recipient_email", userMail);
    }
    userMailData.append("subject", "Network Access Request Submit Successfully");
    userMailData.append("body", userMailBody);
    userMailData.append("sender", "noreply@punjab.gov.in");
    userMailData.append("cc", "legendthe727@gmail.com");

    this.emailService.sendEmail(userMailData).subscribe(response => {
      console.log('Email sent successfully', response);
      this.resetForm();
    }, error => {
      console.error('Error sending email', error);
    });

    const govtMail = this.formData.govtEmailId;
    let govtMailBody = this.generateOfficerEmailBody(this.formData, this.districtName);
    let govtMailData: FormData = new FormData();
    
    if (govtMail) {
      govtMailData.append("recipient_email", govtMail);
    }

    govtMailData.append("subject", "Network Access Request Details");
    govtMailData.append("body", govtMailBody);
    govtMailData.append("sender", "noreply@punjab.gov.in");
    govtMailData.append("cc", "legendthe727@gmail.com");
    
    this.emailService.sendEmail(govtMailData).subscribe(response => {
      console.log('Govt Email sent successfully', response);
      this.resetForm();
    }, error => {

      console.error('Error sending email', error);
    });
  }
  

  generateOfficerEmailBody(formData: NetworkRequest, districtName: string | undefined): string {
    const formDataEncoded = encodeURIComponent(JSON.stringify(formData));
    return `
      <!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>
          <div class="container-md col-md-6">
              <div class="jumbotron">
                  <b>
                      <h3 class="h1">Hello Sir!</h3>
                  </b>
                  <p class="h3">
                      <small class="text-muted">Please check the Network Access Request Form detail of user & verify the request.</small>
                  </p>
                  <hr class="my-4">
                  <p class="">
                      <small class="text-muted">If you don't verify this network request, then no further action will proceed.</small>
                  </p>
                  <hr class="my-4">
              </div>
          </div>
          <h1>Network Access Request Form Detail</h1>
          <table id="naf" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
              <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Network Reference ID</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Request User Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Designation</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Contact</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Email</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Reporting Officer Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Officer Mobile Number</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #09020e; color: white;">Verification Link</th>
              </tr>
              <tr>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.networkRequestId}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.contactName}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.designation}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.contactNo}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.email}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerName}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;">${formData.officerMobile}</td>
                  <td style="background-color: #f2f2f2; border: 1px solid #ddd;"><a href="http://localhost:4200/verify-na-request?data=${formDataEncoded}" class="btn btn-success btn-lg">Verify Network Request</a>
</td>
              </tr>
          </table>
          <br>
          <hr class="my-4">
          
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
                  <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.departmentId}</td>
              </tr>
              <tr style="background-color: #f2f2f2;">
                  <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; border: 1px solid #ddd; color: white;">Device Type</th>
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
                  <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${districtName}</td>
              </tr>
              <tr>
                  <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Location</th>
                  <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.location}</td>
              </tr>
              <tr style="background-color: #f2f2f2;">
                  <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Duration</th>
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
                  <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Officer Email</th>
                  <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.govtEmailId}</td>
              </tr>
          </table>
          <hr class="my-4">
          <p class="h5">Regards,</p>
          <p class="h5">
              <small class="text-muted">Punjab State Wide Area Network (PAWAN)</small>
          </p>
          <hr class="my-4">
          <p class="h5">
              Punjab State Wide Area Network (PAWAN):
              <small class="text-muted">The Punjab State Wide Area Network (PAWAN) has been established in the year 2010 at the state level primarily to connect various departments.</small>
          </p>
      </body>
      </html>
    `;
}

  generateUserEmailBody(formData: NetworkRequest, districtName: string | undefined): string {
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
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.departmentId}</td>
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
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${districtName}</td>
    </tr>
    <tr>
      <th style="width: 40%; padding-top: 12px; padding-bottom: 12px; text-align: left; border: 1px solid #ddd; background-color: #04AA6D; color: white;">Location</th>
      <td style="width: 60%; border: 1px solid #ddd; padding: 8px;">${formData.location}</td>
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

    if (locationType == "1") {
      this.districtOptions = this.categories.filter(category => category.type_id == parseInt(locationType));
    } else if (locationType == "2") {
      this.districtOptions = this.categories.filter(category => category.type_id == parseInt(locationType));
    } else if (locationType == "3") {
      this.districtOptions = this.categories.filter(category => category.type_id == parseInt(locationType));
    }
    else {
      this.districtOptions = [];
    }

    this.showDistrict = true;
    console.log(this.districtOptions, "options")
  }

  updateLocationOptions() {
    const selectedDistrictId = this.formData.district;
    this.clickedDistrictObject = this.districtOptions.find(district => district.id === parseInt(selectedDistrictId));
    this.districtName = this.clickedDistrictObject?.name;
    this.selectedDistrictShortName = this.clickedDistrictObject?.shortName || '';

    this.filteredLocations = this.locations.filter(location => location.categorywithtype_id === parseInt(selectedDistrictId));
    this.showLocation = true;
  }

  onLocationChange() {
    const selectedLocation = this.formData.location;
    this.clickedLocationObject = this.filteredLocations.find(location => location.name === selectedLocation);
    this.selectedLocationShortName = this.clickedLocationObject?.shortName || '';
  }

  resetForm() {
    this.formData = {
      id: 0,
      networkRequestId: '',
      contactName: '',
      designation: '',
      departmentId: 0,
      deviceType: '',
      contactNo: '',
      floorAddress: '',
      roomNo: '',
      locationTypeId: '',
      district: '',
      location: '',
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