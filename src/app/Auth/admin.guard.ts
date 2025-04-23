import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const roles = this.auth.getRoles();
    if (roles.includes('admin')) {
      return true;
    }
    // Not an admin
    this.router.navigate(['/login']);
    return false;
  }
}
