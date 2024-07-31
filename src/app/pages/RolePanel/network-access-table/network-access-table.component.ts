import { Component, OnInit } from '@angular/core';
import { DashboardTable } from '../../../interfaces/dashboard-table';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-network-access-table',
  templateUrl: './network-access-table.component.html',
  styleUrls: ['./network-access-table.component.css']
})

export class NetworkAccessTableComponent implements OnInit {
  networkRequests: DashboardTable[] = [];
  paginatedRequests: DashboardTable[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  selectedStatus: string = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.fetchNetworkRequests();
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilters();
  }

  fetchNetworkRequests() {
    this.dashboardService.getDashboardNetworkRequests()
      .subscribe((data: DashboardTable[]) => {
        console.log('Fetched network requests:', data);
        this.networkRequests = data;
        this.applyFilters();
      }, error => {
        console.error('Error fetching network requests', error);
      });
  }

  applyFilters() {
    console.log('Applying filters with selected status:', this.selectedStatus);
    const filteredRequests = this.networkRequests.filter(request => {
      if (this.selectedStatus && this.selectedStatus !== 'Show All') {
        return request.status === this.selectedStatus;
      }
      return true;
    });

    this.totalPages = Math.ceil(filteredRequests.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRequests = filteredRequests.slice(startIndex, startIndex + this.itemsPerPage);
    console.log('Paginated requests:', this.paginatedRequests);
  }

  onFilterButtonClick(status: string) {
    this.selectedStatus = status;
    this.currentPage = 1; // Reset to first page whenever the filter is applied
    this.applyFilters();
  }

  onExportButtonClick(format: string) {
    console.log(`Exporting data as ${format}`);
    // Add logic to export data in the specified format (CSV, PDF, Excel, Copy)
  }

  onViewClick(requestId: string) {
    console.log(`Viewing request with ID: ${requestId}`);
    // Add logic to handle viewing a network request
  }

  onEditClick(requestId: string) {
    console.log(`Editing request with ID: ${requestId}`);
    // Add logic to handle editing a network request
  }

  onDeleteClick(requestId: string) {
    console.log(`Deleting request with ID: ${requestId}`);
    // Add logic to handle deleting a network request
  }

  onTrackClick(requestId: string) {
    console.log(`Tracking request with ID: ${requestId}`);
    // Add logic to handle tracking a network request
  }
}