import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Block access to protected routes if not logged in
  canActivate(): boolean {
    if (!this.authService.getAuth()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
