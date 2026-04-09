import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Submit login form and navigate to list on success
  login(f: NgForm) {
    if (f.invalid) return;

    this.authService.login({ userName: this.userName, password: this.password }).subscribe({
      next: res => {
        if (res.success) {
          this.authService.setAuth(true);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('username', this.userName);
          }
          this.router.navigate(['/list']);
        } else {
          this.errorMessage = res.message || 'Login failed.';
          this.cdr.detectChanges();
        }
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Login failed. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}
