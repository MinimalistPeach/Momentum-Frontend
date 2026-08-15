import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PlansComponent } from './pages/plans/plans.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'plans', component: PlansComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/home' }
];
