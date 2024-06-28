import { Component } from '@angular/core';

@Component({
  selector: 'app-na-request-form',
  templateUrl: './na-request-form.component.html',
  styleUrl: './na-request-form.component.css'
})
export class NARequestFormComponent {
  formData = {
    name: '',
    designation: '',
    department: '',
    contactNo: '',
    email: '',
    floor: '',
    roomNo: '',
    deviceType: '',
    locationType: '',
    district: '',
    duration: '',
    remarks: '',
    reportingOfficerName: '',
    officeMobileNumber: '',
    officerDesignation: '',
    govEmail: '',
    inputAddress: ''
  };

  departments = ['A', 'B', 'C'];
  devices = ['Desktop', 'Laptop', 'Tablet', 'Smartphone'];
  locationTypes = [
    { value: 'headquarters', label: 'Headquarters' },
    { value: 'districts', label: 'Districts' },
    { value: 'horizontal', label: 'Horizontal' }
  ];
  durations = ['1 month', '3 months', '6 months', '1 year'];

  districtOptions: string[] = [];
  showDistrict = false;

  onSubmit() {
    // Handle form submission
    console.log(this.formData);
  }

  updateDistrictOptions() {
    const locationType = this.formData.locationType;

    if (locationType === 'headquarters') {
      this.districtOptions = ['District', 'DGR', 'Ferozepur HQ'];
    } else if (locationType === 'districts') {
      this.districtOptions = ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'SAS Nagar', 'Shahid Bhagat Singh Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'];
    } else if (locationType === 'horizontal') {
      this.districtOptions = ['Horizontal 1', 'Horizontal 2', 'Horizontal 3', 'Horizontal 4', 'Horizontal 5'];
    }

    this.showDistrict = true;
  }
}
