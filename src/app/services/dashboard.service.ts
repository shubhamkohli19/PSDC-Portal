import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetworkRequest } from '../interfaces/network-request';
import { NetworkMenu } from '../interfaces/networkMenu';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private apiUrl = 'https://localhost:44352/api/Dashboard';

  constructor(private http: HttpClient) { }

  getNetworkMenu(): Observable<NetworkMenu> {
    return this.http.get<NetworkMenu>(`${this.apiUrl}/getNetworkMenu`);
  }

  
}