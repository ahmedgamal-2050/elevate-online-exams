import { Route } from '@angular/router';
import { AuthRoutes } from './auth/enums/auth-routes';

export const authRoutes: Route[] = [
  {
    path: AuthRoutes.login,
  },
  {
    path: AuthRoutes.register,
  },
  {
    path: AuthRoutes.forgotPassword,
  },
  {
    path: '',
    redirectTo: AuthRoutes.login,
    pathMatch: 'full',
  },
];
