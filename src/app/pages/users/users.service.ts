import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private getApiUrl = '/api/Jira/GetAllUSers';
  private createApiUrl = '/api/Jira/CreateUser';
  private updateApiUrl = '/api/Jira/UpdateUser';
  private deleteApiUrl = '/api/Jira/DeleteUserById';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.getApiUrl);
  }

  createUser(obj: any): Observable<any> {
    return this.http.post(this.createApiUrl, obj);
  }

  updateUser(obj: any): Observable<any> {
    return this.http.put(this.updateApiUrl, obj);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.deleteApiUrl}?id=${id}`);
  }
}
