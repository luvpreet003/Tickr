import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private getApiUrl = '/api/Jira/GetAllProjects';
  private createApiUrl = '/api/Jira/CreateProject';
  private updateApiUrl = '/api/Jira/UpdateProject';
  private deleteApiUrl = '/api/Jira/DeleteProjectById';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get(this.getApiUrl);
  }

  createProject(obj: any): Observable<any> {
    return this.http.post(this.createApiUrl, obj);
  }

  updateProject(obj: any): Observable<any> {
    return this.http.put(this.updateApiUrl, obj);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.deleteApiUrl}?id=${id}`);
  }
}
