import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // ✅ adjust if path differs

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    const payload = {
      username: this.name,
      email: this.email,
      password: this.password,
      role: 'USER',
      firstName: this.firstName,
      lastName: this.lastName
    };
  
    this.auth.signup(payload).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Signup failed:', err);
  
        // Best effort extraction
        this.errorMessage =
          typeof err.error === 'string'
            ? err.error
            : err.error?.error || err.message || 'Signup failed. Please try again.';
      }
    });
  }
  
}
