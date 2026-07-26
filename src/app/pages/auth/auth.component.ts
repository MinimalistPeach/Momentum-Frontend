import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  mode: 'login' | 'register' = 'login';

  switchMode(newMode: 'login' | 'register'): void {
    this.mode = newMode;
  }
}
