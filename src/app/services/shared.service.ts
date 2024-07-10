import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryWithTypes, Locations } from '../interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl = 'https://localhost:44352/api/Common';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getDepartments`);
  }

  getCategoryWithTypes(): Observable<CategoryWithTypes[]>{
    return this.http.get<CategoryWithTypes[]>(`${this.apiUrl}/getCategoryWithTypes`);
  }

  getLocations(): Observable<Locations[]>{
    return this.http.get<Locations[]>(`${this.apiUrl}/getLocations`);
  }
}
