import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-backlayout',
  standalone: true,
  imports: [SidenavComponent,RouterModule],
  templateUrl: './backlayout.component.html',
  styleUrl: './backlayout.component.css'
})
export class BacklayoutComponent {

}
