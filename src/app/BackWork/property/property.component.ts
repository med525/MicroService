import { Component, OnInit } from '@angular/core';
import { PropertyService } from './property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-properties',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponentB implements OnInit {
  properties: any[] = [];
  loading = false;
  errorMessage = '';
  isEditing = false; 
  currentProperty: any = null; 
  updateForm: any = { 
    title: '',
    location: '',
    type: '',
    value: 0
  };
  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.propertyService.getAllProperties().subscribe({
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

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.errorMessage = 'Failed to delete property.';
        }
      });
    }
  }

  onEdit(property: any): void {
    this.currentProperty = property;
    this.updateForm = {
      title: property.title,
      location: property.location,
      type: property.type,
      value: property.value
    };
    this.isEditing = true;
  }

  submitUpdate(): void {
    if (!this.currentProperty) return;

    this.propertyService.updateProperty(this.currentProperty.id, this.updateForm).subscribe({
      next: () => {
        this.loadProperties();
        this.isEditing = false;
        this.currentProperty = null;
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.errorMessage = 'Failed to update property.';
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentProperty = null;
  }
}
