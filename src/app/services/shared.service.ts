import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl = 'https://localhost:44352/api';

  constructor(private http: HttpClient) { }

  getNetworkRequests(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/Departments`);
  }
}
