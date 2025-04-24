import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = 'http://localhost:8090/incidents';

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

  // ✅ GET all incidents
  getAllIncidents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.getHeaders());
  }

  // ✅ GET incidents by property ID
  getIncidentsByPropertyId(propertyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?propertyId=${propertyId}`, this.getHeaders());
  }

  // ✅ POST create a new incident
  reportIncident(data: { propertyId: number, description: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, data, this.getHeaders());
  }
}
