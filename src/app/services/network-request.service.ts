import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetworkRequest } from '../interfaces/network-request';

@Injectable({
  providedIn: 'root'
})

export class NetworkRequestService {
  private apiUrl = 'https://localhost:44393/api/networkrequest';

  constructor(private http: HttpClient) { }

  getNetworkRequests(): Observable<NetworkRequest[]> {
    return this.http.get<NetworkRequest[]>(this.apiUrl);
  }

  getNetworkRequest(id: number): Observable<NetworkRequest> {
    return this.http.get<NetworkRequest>(`${this.apiUrl}/${id}`);
  }

  addNetworkRequest(request: NetworkRequest): Observable<NetworkRequest> {
    return this.http.post<NetworkRequest>(this.apiUrl, request);
  }

  updateNetworkRequest(id: number, request: NetworkRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  deleteNetworkRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}