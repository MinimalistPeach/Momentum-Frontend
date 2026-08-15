import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { AuthService, LoginUserDto, RegisterUserDto } from '../../api';
import { lastValueFrom } from 'rxjs';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  private readonly authService: AuthService = inject(AuthService);

  private readonly tokenService: TokenService = inject(TokenService);

  mode: 'login' | 'register' = 'login';

  switchMode(newMode: 'login' | 'register'): void {
    this.mode = newMode;
  }

  async login(loginData: LoginUserDto) {
    await lastValueFrom(this.authService.signIn(loginData)).then((token) => {
      this.tokenService.setToken(token.access_token);
    });
  }

  async register(registerData: RegisterUserDto) {
    await lastValueFrom(this.authService.register(registerData));
  }
}
