import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Email {
  sender: string,
  recipient: string,
  subject: string,
  body: string,
  cc: string,
  file: File
}

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private apiUrl = 'https://eapi.punjab.gov.in/emapi/emailAttachment';

  constructor(private http: HttpClient) { }

  sendEmail(data: FormData): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders()
    .append("Server-Key","DbKBA17wVmA7Kwu8niQUgW18DnhEkwK2WM9QAnhZjxDftLg7jshkV1oyDjPjZYa5")
    
    return this.http.post(this.apiUrl, data, {headers: headers});
  }
}