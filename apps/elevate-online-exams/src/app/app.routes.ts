import { Route } from '@angular/router';
import { AppRoutes } from './core/enum/app-routes';

export const appRoutes: Route[] = [
  {
    path: AppRoutes.auth.root,
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
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
