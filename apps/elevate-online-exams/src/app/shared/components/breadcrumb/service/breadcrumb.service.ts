import { Injectable, signal } from '@angular/core';
import { AppRoutes } from 'apps/elevate-online-exams/src/app/core/enum/app-routes';
import { Breadcrumb } from '../breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbList = signal<Breadcrumb[]>([
    {
      link: AppRoutes.dashboard.diplomas,
      label: 'Home',
    },
  ]);
}
