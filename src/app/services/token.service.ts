import { inject, Injectable } from '@angular/core';
import { TokenInfo } from '../models/token.info';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  private readonly _jwtHelperService = inject(JwtHelperService);

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    const token = this.getToken();
    return token !== null && token.trim() !== '';
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (token === null) {
      return false;
    }
    return this.hasToken() && !this._jwtHelperService.isTokenExpired(token);

  }

  getInfoFromToken(): TokenInfo | null {
    const token = this.getToken();
    const tokenData = this._jwtHelperService.decodeToken(token!);
    return { username: tokenData.username };
  }
}
