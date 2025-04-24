import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IncidentService } from './incident.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css'
})
export class IncidentsComponentF {
  propertyId!: number;
  incidents: any[] = [];
  description: string = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = Number(params.get('propertyId'));
      this.loadIncidents();
    });
  }

  loadIncidents(): void {
    this.incidentService.getAllIncidents().subscribe({
      next: (data) => {
        this.incidents = data.filter(i => i.propertyId === this.propertyId);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load incidents';
        console.error(err);
      }
    });
  }

  addIncident(): void {
    if (!this.description.trim()) {
      this.errorMessage = 'Description is required';
      return;
    }

    this.incidentService.reportIncident({
      propertyId: this.propertyId,
      description: this.description
    }).subscribe({
      next: (res) => {
        this.description = '';
        this.successMessage = 'Incident reported successfully';
        this.loadIncidents();
      },
      error: (err) => {
        this.errorMessage = 'Failed to report incident';
        console.error(err);
      }
    });
  }
}