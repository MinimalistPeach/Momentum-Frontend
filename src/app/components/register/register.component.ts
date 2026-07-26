import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  success: string = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields';
      this.success = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      this.success = '';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      this.success = '';
      return;
    }

    // Mock register - replace with actual API call
    const mockToken = 'mock_token_' + Math.random().toString(36).substring(7);
    this.tokenService.setToken(mockToken);
    this.success = 'Account created successfully!';
    this.error = '';

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
  }
}
