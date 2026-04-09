import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost/AngularApp3/backend';

  // Track login state in memory and localStorage
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Send login credentials to backend
  login(user: { userName: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login.php`, user);
  }

  // Send registration data to backend
  register(user: { userName: string; password: string; emailAddress: string }) {
    return this.http.post<any>(`${this.baseUrl}/register.php`, user);
  }

  // Clear auth state and go to login page
  logout() {
    this.isAuthenticated = false;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
    }
    this.router.navigate(['/login']);
  }

  // Save auth state to localStorage
  setAuth(auth: boolean) {
    this.isAuthenticated = auth;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth', auth ? 'true' : 'false');
    }
  }

  // Read auth state from localStorage
  getAuth(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('auth') === 'true';
    }
    return false;
  }

  // Get the logged-in username from localStorage
  getUsername(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('username') || '';
    }
    return '';
  }
}
