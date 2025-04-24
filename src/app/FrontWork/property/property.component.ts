import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from './property.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, Map, tileLayer, marker, icon, Marker } from 'leaflet';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, LeafletModule,RouterModule],
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponentF implements OnInit {
  
  properties: any[] = [];
  loading = false;
  errorMessage = '';

  // 🌍 Form Data
  formData: any = {
    id: null,
    title: '',
    location: '',
    type: '',
    estimatedValue: null,
    latitude: 34,
    longitude: 9
  };

  // 🗺️ Map & Marker
  map!: Map;
  mainMarker!: Marker;

  mapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 6,
    center: latLng(34, 9)
  };

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.propertyService.getMyProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load properties.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.formData.id) {
      this.propertyService.updateProperty(this.formData.id, this.formData).subscribe({
        next: () => {
          this.loadProperties();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.propertyService.createProperty(this.formData).subscribe({
        next: () => {
          this.loadProperties();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  editProperty(property: any): void {
    this.formData = { ...property };
    this.updateMapMarker();
  }

  resetForm(): void {
    this.formData = {
      id: null,
      title: '',
      location: '',
      type: '',
      estimatedValue: null,
      latitude: 34,
      longitude: 9
    };
    this.updateMapMarker();
  }

  deleteProperty(id: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => this.loadProperties(),
        error: (err) => {
          console.error('Failed to delete property:', err);
          this.errorMessage = 'Failed to delete the property.';
        }
      });
    }
  }

  // 🧭 Leaflet Hooks
  onMapReady(map: Map) {
    this.map = map;
    this.mainMarker = marker([this.formData.latitude, this.formData.longitude], {
      draggable: true,
      icon: icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(this.map);

    this.mainMarker.on('moveend', () => {
      const coords = this.mainMarker.getLatLng();
      this.formData.latitude = coords.lat;
      this.formData.longitude = coords.lng;
    });

    this.map.on('click', (e: any) => {
      this.mainMarker.setLatLng(e.latlng);
      this.formData.latitude = e.latlng.lat;
      this.formData.longitude = e.latlng.lng;
    });

    setTimeout(() => this.map.invalidateSize(), 400);
  }

  updateMapMarker(): void {
    if (this.map && this.mainMarker) {
      const coords = latLng(this.formData.latitude, this.formData.longitude);
      this.mainMarker.setLatLng(coords);
      this.map.setView(coords, this.map.getZoom());
    }
  }

  viewIncidents(propertyId: number): void {
    this.router.navigate(['/incidents', propertyId]);
  }
  
}
