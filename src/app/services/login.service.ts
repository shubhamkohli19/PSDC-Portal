import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

const API_BASE_URL: string = "https://localhost:44352/api/Login";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(login: Login): Observable<string> {
    return new Observable<string>((observer) => {
      this.httpClient.post<any>(`${API_BASE_URL}/loginUser`, login).subscribe(
        (response: any) => {
          if (response.token) {
            console.log(response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            this.router.navigate(['/homepage']);
            if(localStorage.getItem('role') == 'admin'){
              this.router.navigate(['/adminDashboard']);
            }
            
          }
          observer.complete();
        },
        (error: any) => {
          if (error.status == 409) {
            observer.next(error.error);
          } else {
            observer.error('An error occurred. Please try again.');
          }
          observer.complete();
        }
      );
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/homepage']);
  }
}