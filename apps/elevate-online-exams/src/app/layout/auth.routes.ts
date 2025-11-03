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
    path: AppRoutes.auth.forgotPassword,
    loadComponent: () =>
      import('../feature/auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: AppRoutes.auth.verifyOtp,
    loadComponent: () =>
      import('../feature/auth/verify-otp/verify-otp.component').then(
        (m) => m.VerifyOtpComponent
      ),
  },
  {
    path: AppRoutes.auth.resetPassword,
    loadComponent: () =>
      import('../feature/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: '',
    redirectTo: AppRoutes.auth.login,
    pathMatch: 'full',
  },
];
