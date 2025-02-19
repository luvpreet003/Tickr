import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = '/api/Jira/GetAllProjects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
