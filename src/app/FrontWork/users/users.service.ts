import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Auth/auth.service'; // ✅ adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8090/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getAllKeycloakUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/keycloak`, this.getHeaders());
  }

  deleteKeycloakUser(id: string) {
    return this.http.delete(`${this.baseUrl}/keycloak/${id}`, this.getHeaders());
  }

  updateKeycloakUser(id: string, updates: any) {
    return this.http.put(`${this.baseUrl}/keycloak/${id}`, updates, this.getHeaders());
  }
}
