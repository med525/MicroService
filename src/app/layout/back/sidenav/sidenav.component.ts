import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  adminName = sessionStorage.getItem('username') || 'Admin';

  constructor(private router: Router) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
