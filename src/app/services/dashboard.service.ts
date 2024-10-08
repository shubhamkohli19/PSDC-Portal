import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetworkMenu } from '../interfaces/networkMenu';
import { DashboardTable } from '../interfaces/dashboard-table';
import { AssignNetworkTask } from '../interfaces/assignNetworkTask';
import { addEngineerComment } from '../interfaces/addEngineerComment';
import { ViewRequest } from '../interfaces/viewRequest';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private apiUrl = 'https://localhost:44352/api/Dashboard';

  constructor(private http: HttpClient) { }

  getNetworkMenu(): Observable<NetworkMenu> {
    return this.http.get<NetworkMenu>(`${this.apiUrl}/getNetworkMenu`);
  }

  getDashboardNetworkRequests(): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(`${this.apiUrl}/getNetworkRequests`);
  }

  assignNetworkTask(task: AssignNetworkTask): Observable<AssignNetworkTask> {
    return this.http.put<AssignNetworkTask>(`${this.apiUrl}/assignNetworkTask`, task);
  }

  addEngineerComment(comment: addEngineerComment): Observable<addEngineerComment> {
    return this.http.put<addEngineerComment>(`${this.apiUrl}/addEngineerComment`, comment);
  }

  engineerResolved(id: string | undefined): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/engineerResolved/${id}`, {});
  }
  getViewRequests(): Observable<ViewRequest[]> {
    return this.http.get<ViewRequest[]>(`${this.apiUrl}/getViewRequests`);
  }

  helpDeskCompleted(id: string | undefined): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/helpdeskCompleted/${id}`, {});
  }
}