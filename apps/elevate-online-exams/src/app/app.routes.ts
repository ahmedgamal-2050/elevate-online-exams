import { Route } from '@angular/router';
import { authRoutes } from './layout/auth.routes';
import { AppRoutes } from './core/enum/app-routes';
import { dashboardRoutes } from './layout/dashboard.routes';

export const appRoutes: Route[] = [
  {
    path: AppRoutes.auth.root,
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        m => m.AuthLayoutComponent
      ),
    children: [...authRoutes],
  },
  {
    path: AppRoutes.dashboard.root,
    loadComponent: () =>
      import('./layout/dashboard-layout/dashboard-layout.component').then(
        m => m.DashboardLayoutComponent
      ),
    children: [...dashboardRoutes],
  },
  {
    path: '**',
    redirectTo: AppRoutes.auth.root + '/' + AppRoutes.auth.login,
  },
  {
    path: '',
    redirectTo: AppRoutes.auth.root + '/' + AppRoutes.auth.login,
    pathMatch: 'full',
  },
];
