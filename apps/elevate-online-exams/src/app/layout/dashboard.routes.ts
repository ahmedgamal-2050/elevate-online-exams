import { Route } from '@angular/router';
import { AppRoutes } from '../core/enum/app-routes';

export const dashboardRoutes: Route[] = [
  {
    path: AppRoutes.dashboard.diplomas,
    loadComponent: () =>
      import('../feature/dashboard/diplomas/diplomas.component').then(
        m => m.DiplomasComponent
      ),
  },
  {
    path: `${AppRoutes.dashboard.diplomas}/:diplomas_id/${AppRoutes.dashboard.exams}`,
    loadComponent: () =>
      import('../feature/dashboard/exams/exams.component').then(
        m => m.ExamsComponent
      ),
  },
  {
    path: `${AppRoutes.dashboard.diplomas}/:diplomas_id/${AppRoutes.dashboard.exams}/:exams_id/${AppRoutes.dashboard.questions}`,
    loadComponent: () =>
      import('../feature/dashboard/questions/questions.component').then(
        m => m.QuestionsComponent
      ),
  },
  {
    path: `${AppRoutes.dashboard.accountSettings}`,
    loadComponent: () =>
      import(
        '../feature/dashboard/account-settings/account-settings.component'
      ).then(m => m.AccountSettingsComponent),
  },
  {
    path: '',
    redirectTo: AppRoutes.dashboard.diplomas,
    pathMatch: 'full',
  },
];
