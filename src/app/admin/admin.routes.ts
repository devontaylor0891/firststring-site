import { Routes } from '@angular/router';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/admin-login.component').then(m => m.AdminLoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./shell/admin-shell.component').then(m => m.AdminShellComponent),
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./users/admin-users.component').then(m => m.AdminUsersComponent),
      },
      {
        path: 'teams',
        loadComponent: () => import('./teams/admin-teams.component').then(m => m.AdminTeamsComponent),
      },
      {
        path: 'payments',
        loadComponent: () => import('./payments/admin-payments.component').then(m => m.AdminPaymentsComponent),
      },
      {
        path: 'signups',
        loadComponent: () => import('./signups/admin-signups.component').then(m => m.AdminSignupsComponent),
      },
    ],
  },
];
