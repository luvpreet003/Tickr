import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  setLogin(userData: any) {
    localStorage.setItem('loginDetails', JSON.stringify(userData));
  }

  getLoginDetails() {
    const data = localStorage.getItem('loginDetails');
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loginDetails');
  }

  logout() {
    localStorage.removeItem('loginDetails');
    this.router.navigate(['/login']);
  }
}
