import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Auth/auth.service'; // adjust path as needed
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseUrl = 'http://localhost:8090/properties';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  // GET all properties
  getAllProperties(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.getHeaders());
  }

  // GET properties owned by the current user
  getMyProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my`, this.getHeaders());
  }

  // POST create new property
  createProperty(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data, this.getHeaders());
  }

  // PUT update a property by ID
  updateProperty(id: number, updates: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updates, this.getHeaders());
  }

  // DELETE a property by ID
  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getHeaders());
  }
}
