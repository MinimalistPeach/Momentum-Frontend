import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { RegisterUserDto } from '../../api';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() registerButtonClick: EventEmitter<RegisterUserDto> = new EventEmitter();

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  success: string = '';

  constructor(
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password || !this.confirmPassword) {
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

    this.success = 'Account created successfully!';
    this.error = '';

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
  }
}
