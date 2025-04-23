import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const roles = this.auth.getRoles();
  
    if (roles.includes('admin')) {
      this.router.navigate(['/back']);
      return false; // block frontend route
    }
  
    if (roles.includes('user')) {
      return true;
    }
  
    this.router.navigate(['/login']);
    return false;
  }
  
}
