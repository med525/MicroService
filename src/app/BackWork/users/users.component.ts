import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  updateForm = {
    email: '',
    firstName: '',
    lastName: '',
    enabled: true
  };
  successMessage = '';
  errorMessage = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllKeycloakUsers().subscribe({
      next: (data) => this.users = data,
      error: () => this.errorMessage = '❌ Failed to load users'
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.updateForm = {
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      enabled: user.enabled
    };
    this.successMessage = '';
    this.errorMessage = '';
  }

  updateUser() {
    if (!this.selectedUser) return;
    this.usersService.updateKeycloakUser(this.selectedUser.id, this.updateForm).subscribe({
      next: () => {
        this.successMessage = '✅ User updated successfully';
        this.loadUsers();
        this.selectedUser = null;
      },
      error: () => this.errorMessage = '❌ Failed to update user'
    });
  }

  deleteUser(userId: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.usersService.deleteKeycloakUser(userId).subscribe({
      next: () => this.loadUsers(),
      error: () => this.errorMessage = '❌ Failed to delete user'
    });
  }

  cancelEdit() {
    this.selectedUser = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
