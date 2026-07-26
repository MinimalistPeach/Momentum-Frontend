import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { LoginUserDto } from '../../api';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() loginButtonPressed: EventEmitter<LoginUserDto> = new EventEmitter();

  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }
  }
}
