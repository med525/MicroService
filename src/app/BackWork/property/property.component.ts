import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {

}
