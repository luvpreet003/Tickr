import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private baseUrl = '/api/Jira';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllProjects`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllUsers`);
  }

  createTicket(ticketObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateTicket`, ticketObj);
  }
}
