import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetworkRequest } from '../interfaces/network-request';
import { VerificationNA } from '../interfaces/verificationNA';
import { UpdateNetworkRequest } from '../interfaces/updateNetworkRequest';

@Injectable({
  providedIn: 'root'
})

export class NetworkRequestService {
  private apiUrl = 'https://localhost:44352/api/NetworkRequest';

  constructor(private http: HttpClient) { }

  getNetworkRequests(): Observable<NetworkRequest[]> {
    return this.http.get<NetworkRequest[]>(this.apiUrl);
  }

  getTotalRequests(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/getTotalRequests`)
  }

  checkExistingRequest(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/checkExistingRequest/${id}`);
  }

  getNetworkRequest(id: number): Observable<NetworkRequest> {
    return this.http.get<NetworkRequest>(`${this.apiUrl}/${id}`);
  }

  addNetworkRequest(request: NetworkRequest): Observable<NetworkRequest> {
    return this.http.post<NetworkRequest>(this.apiUrl, request);
  }

  updateNetworkRequest(request: UpdateNetworkRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updateNetworkRequest`, request);
  }

  deleteNetworkRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verificationNA(id: string): Observable<NetworkRequest> {
    return this.http.get<NetworkRequest>(`https://localhost:44352/api/Verification/${id}`);
  }
}