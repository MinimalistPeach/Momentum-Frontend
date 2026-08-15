import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  private readonly _userService = inject(UserService);

  showMenu = true;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public get username(): string {
    return this._userService.username;
  }

  public get usernameFirstLetter(): string {
    return this._userService.username.at(0)!.toUpperCase();
  }
}
