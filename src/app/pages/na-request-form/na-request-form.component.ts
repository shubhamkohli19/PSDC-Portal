import { Component } from '@angular/core';
import { NetworkRequestService } from '../../services/network-request.service';
import { NetworkRequest } from '../../interfaces/network-request';

@Component({
  selector: 'app-na-request-form',
  templateUrl: './na-request-form.component.html',
  styleUrls: ['./na-request-form.component.css']
})

export class NARequestFormComponent {
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

  departments = [1, 2, 3];
  devices = ['Desktop', 'Laptop', 'Tablet', 'Smartphone'];
  locationTypes = [
    { value: 'headquarters', label: 'Headquarters' },
    { value: 'districts', label: 'Districts' },
    { value: 'horizontal', label: 'Horizontal' }
  ];
  durations = ['1 month', '3 months', '6 months', '1 year'];

  districtOptions: { value: number, label: string }[] = [];
  showDistrict = false;

  constructor(private networkRequestService: NetworkRequestService) { }

  onSubmit() {
    console.log(this.formData);
    this.networkRequestService.addNetworkRequest(this.formData).subscribe(
      response => {
        console.log('Request submitted successfully:', response);
        // Reset form after successful submission if needed
        this.resetForm();
      },
      error => {
        console.error('Error submitting request:', error);
      }
    );
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

    // Set default locationId to the first district option
    this.formData.locationId = this.districtOptions.length > 0 ? this.districtOptions[0].value : 0;

    this.showDistrict = true;
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