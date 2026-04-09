import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName = '';
  emailAddress = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Submit registration form — checks passwords match before sending
  register(f: NgForm) {
    if (f.invalid) return;

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.cdr.detectChanges();
      return;
    }

    this.authService.register({
      userName: this.userName,
      password: this.password,
      emailAddress: this.emailAddress
    }).subscribe({
      next: res => {
        if (res.success) {
          this.successMessage = 'Registration successful! You can now log in.';
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = res.message || 'Registration failed.';
          this.cdr.detectChanges();
        }
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}
