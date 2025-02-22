import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Ticket {
  ticketId: number;
  createdDate: string;
  summary: string;
  status: string;
  description: string;
  parentId: number;
  storyPoint: number;
  ticketGuid: string;
  assignedTo: string;
  createdBy: number;
  projectId: number;
}

interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = '/api/Jira'; // Replace with actual API
  private usersApiUrl = 'https://jsonplaceholder.typicode.com/users'; // Replace with actual user API

  constructor(private http: HttpClient) {}

  getTickets(projectId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      `${this.apiUrl}/GetTicketsByProjectId?${projectId}`
    );
  }

  updateTicket(ticket: any): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/UpdateTicket`, ticket);
  }

  deleteTicket(ticketId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/DeleteTicketById?id=${ticketId}`
    );
  }

  cretaeTicket(ticket: Ticket): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.usersApiUrl}/CreateTicket`, ticket);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/Jira/GetAllUsers');
  }
}
