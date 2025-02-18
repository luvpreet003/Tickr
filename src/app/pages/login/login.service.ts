import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = '/api/Jira/Login';

  constructor(private http: HttpClient) {}

  login(loginObj: any): Observable<any> {
    return this.http.post(this.apiUrl, loginObj);
  }
}
