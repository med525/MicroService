import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Auth/auth.service'; // ✅ adjust path if needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isOpen = false;

  constructor(private router: Router, public auth: AuthService) {}

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }
}
