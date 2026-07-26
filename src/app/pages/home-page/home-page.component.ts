import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/auth']);
  }
}
