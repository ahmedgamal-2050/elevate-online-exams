import { Route } from '@angular/router';
import { AppRoutes } from '../core/enum/app-routes';

export const authRoutes: Route[] = [
  {
    path: AppRoutes.auth.login,
    loadComponent: () =>
      import('../feature/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: AppRoutes.auth.register,
    loadComponent: () =>
      import('../feature/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: '',
    redirectTo: AppRoutes.auth.login,
    pathMatch: 'full',
  },
];
