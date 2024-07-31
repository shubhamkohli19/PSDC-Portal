import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetworkMenu } from '../interfaces/networkMenu';
import { DashboardTable } from '../interfaces/dashboard-table';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private apiUrl = 'https://localhost:44356/api/Dashboard';

  constructor(private http: HttpClient) { }

  getNetworkMenu(): Observable<NetworkMenu> {
    return this.http.get<NetworkMenu>(`${this.apiUrl}/getNetworkMenu`);
  }

  getDashboardNetworkRequests(): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(`${this.apiUrl}/getNetworkRequests`);
  }
}