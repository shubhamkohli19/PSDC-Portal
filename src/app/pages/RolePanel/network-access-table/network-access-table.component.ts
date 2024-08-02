import { Component, OnInit } from '@angular/core';
import { DashboardTable } from '../../../interfaces/dashboard-table';
import { DashboardService } from '../../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network-access-table',
  templateUrl: './network-access-table.component.html',
  styleUrls: ['./network-access-table.component.css']
})

export class NetworkAccessTableComponent implements OnInit {
  networkRequests: DashboardTable[] = [];
  isHelpDesk: boolean = (localStorage.getItem('role') == 'helpDesk');
  role: string | null = localStorage.getItem('role');
  paginatedRequests: DashboardTable[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  selectedStatus: string = '';

  constructor(private dashboardService: DashboardService, private router: Router) { }

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
    this.currentPage = 1;
    this.applyFilters();
  }

  onExportButtonClick(format: string) {
    console.log(`Exporting data as ${format}`);
  }

  onViewClick(requestId: string) {
    console.log(`Viewing request with ID: ${requestId}`);
  }

  onEditClick(requestId: string) {
    console.log(`Editing request with ID: ${requestId}`);
  }

  onDeleteClick(requestId: string) {
    console.log(`Deleting request with ID: ${requestId}`);
  }

  onTrackClick(requestId: string) {
    console.log(`Tracking request with ID: ${requestId}`);
  }

  redirectToAssigning(id: string | undefined) {
    this.router.navigate(['assignNetworkTask'], { state: { id } });
  }

  redirectToCommenting(id: string | undefined) {
    this.router.navigate(['editEngineer'], { state: { id } });
  }

  displayCompletedButton(status: string): boolean {
    if (this.isHelpDesk && status == 'Forward') {
      return true;
    }
    return false;
  }

  displayCommentButton(request: DashboardTable): boolean {
    if (this.isHelpDesk) {
      return false;
    }
    else if (request.isBackup && this.role == 'backup' && !request.isCommented) {
      return true;
    }
    else if (request.isServer && this.role == 'server' && !request.isCommented) {
      return true;
    }
    else if (request.isStorage && this.role == 'storage' && !request.isCommented) {
      return true;
    }
    else if (request.isNetwork && this.role == 'network' && !request.isCommented) {
      return true;
    }
    return false;
  }

  displayLockedButton(request: DashboardTable): boolean {
    if (this.isHelpDesk) {
      return false;
    }
    else if (request.status != 'Forward') {
      if (request.isBackup && this.role == 'backup' && request.isCommented) {
        return true;
      }
      else if (request.isServer && this.role == 'server' && request.isCommented) {
        return true;
      }
      else if (request.isStorage && this.role == 'storage' && request.isCommented) {
        return true;
      }
      else if (request.isNetwork && this.role == 'network' && request.isCommented) {
        return true;
      }
    }

    return false;
  }

  displayRejectButton(request: DashboardTable): boolean {
    if (this.isHelpDesk) {
      return true;
    }
    else if (request.status != 'Forward') {
      if (request.isBackup && this.role == 'backup') {
        return true;
      }
      else if (request.isServer && this.role == 'server') {
        return true;
      }
      else if (request.isStorage && this.role == 'storage') {
        return true;
      }
      else if (request.isNetwork && this.role == 'network') {
        return true;
      }
    }
    return false;
  }

  changeStatusForward(id: string | undefined) {
    console.log(id);
    this.dashboardService.engineerResolved(id).subscribe((res) => {
      console.log(res);
      this.fetchNetworkRequests();
    });

  }
  viewRequest(id: string | undefined) {
    this.router.navigate(['view-request'], { state: { id } });
  }
}