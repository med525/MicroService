import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/users';
  private tokenKey = 'token';
  private roles: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.roles = payload?.realm_access?.roles || [];
  
      // ✅ Save username for sidenav
      sessionStorage.setItem('username', payload?.preferred_username || 'Admin');
    } catch (error) {
      console.error('Failed to parse token:', error);
      this.roles = [];
    }
  }
  

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRoles(): string[] {
    return this.roles;
  }

  loadRolesFromToken() {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.roles = payload?.realm_access?.roles || [];
      } catch (error) {
        console.error('Failed to reload roles from token:', error);
        this.roles = [];
      }
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.roles = [];
    this.router.navigate(['/login']);
  }
}
