import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''; // 🌟 New error state

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const credentials = {
      username: this.email,
      password: this.password,
    };
  
    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        this.errorMessage = '';
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('🔴 Full error:', err);
  
        let message = '';
  
        // ✅ Case 1: Response is a plain string (e.g., 'Login failed: {"error":"..."}')
        if (typeof err.error === 'string') {
          const jsonMatch = err.error.match(/{.*}/); // extract JSON substring
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[0]);
              message = parsed.error_description || parsed.error || 'An unexpected error occurred.';
            } catch {
              message = err.error;
            }
          } else {
            message = err.error;
          }
        }
  
        // ✅ Case 2: Response is already a JSON object
        else if (typeof err.error === 'object') {
          message = err.error.error_description || err.error.details || err.error.error || 'An error occurred during login.';
        }
  
        // ✅ Fallback
        if (!message) {
          message = 'Login failed. Please check your credentials and try again.';
        }
  
        this.errorMessage = message;
      }
    });
  }
  
  
}
