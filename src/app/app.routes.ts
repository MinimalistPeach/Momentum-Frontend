import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
