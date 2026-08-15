import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
