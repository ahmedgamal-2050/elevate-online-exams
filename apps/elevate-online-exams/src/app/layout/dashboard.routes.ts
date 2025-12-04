import { Route } from '@angular/router';
import { AppRoutes } from '../core/enum/app-routes';

export const dashboardRoutes: Route[] = [
  // {
  //   path: AppRoutes.dashboard.diplomas,
  //   loadComponent: () =>
  //     import('../feature/dashboard/diplomas/diplomas.component').then(
  //       m => m.DiplomasComponent
  //     ),
  // },
  {
    path: '',
    redirectTo: AppRoutes.dashboard.diplomas,
    pathMatch: 'full',
  },
];
