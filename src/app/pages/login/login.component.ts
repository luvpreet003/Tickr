import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('form') form!: NgForm; // Reference to the form

  loginObj = {
    emailId: '',
    password: '',
    fullName: 'string',
  };

  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/projects']);
    }
  }

  onLogin() {
    if (this.form.invalid) return;

    this.errorMessage = '';

    this.loginService.login(this.loginObj).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.authService.setLogin(res.data);
          this.router.navigate(['/projects']); // ✅ Redirecting to projects
        } else {
          this.errorMessage = res.message || 'Invalid credentials!';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed!';
      },
    });
  }
}
