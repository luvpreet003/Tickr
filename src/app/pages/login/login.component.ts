import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginObj: any = {
    userId: 0,
    emailId: 'email',
    fullName: 'string',
    password: 'string',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.loginObj).subscribe((res: any) => {
      console.log(res.data);
      if (res.data) {
        localStorage.setItem('loginDetails', JSON.stringify(res.data));
        this.router.navigate(['projects']).then((navigated) => {
          if (navigated) {
            console.log('Navigation to board successful');
          } else {
            console.error('Navigation failed');
          }
        });
      } else {
        alert(res.message);
      }
    });
  }
}
