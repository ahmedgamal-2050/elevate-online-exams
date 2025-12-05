import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppRoutes } from '../../core/enum/app-routes';
import { SideNavbarComponent } from '../../shared/components/side-navbar/side-navbar.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    SideNavbarComponent,
    BreadcrumbComponent,
    HeaderComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  private sanitizer = inject(DomSanitizer);

  sideNavLinks = signal<{ label: string; link: string[]; icon: SafeHtml }[]>([
    {
      label: 'Diplomas',
      link: ['/' + AppRoutes.dashboard.root, AppRoutes.dashboard.diplomas],
      icon: this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="size-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 9.99987V15.9999M6 12.4999V15.9999C6 16.7955 6.63214 17.5586 7.75736 18.1212C8.88257 18.6838 10.4087 18.9999 12 18.9999C13.5913 18.9999 15.1174 18.6838 16.2426 18.1212C17.3679 17.5586 18 16.7955 18 15.9999V12.4999M21.42 10.9219C21.599 10.8429 21.7509 10.7131 21.8569 10.5487C21.9629 10.3842 22.0183 10.1923 22.0163 9.99661C22.0143 9.80095 21.9549 9.61019 21.8455 9.44795C21.7362 9.28571 21.5816 9.15913 21.401 9.08387L12.83 5.17987C12.5694 5.06102 12.2864 4.99951 12 4.99951C11.7136 4.99951 11.4306 5.06102 11.17 5.17987L2.6 9.07987C2.42196 9.15784 2.27051 9.286 2.16416 9.44868C2.05781 9.61136 2.00117 9.80151 2.00117 9.99587C2.00117 10.1902 2.05781 10.3804 2.16416 10.5431C2.27051 10.7057 2.42196 10.8339 2.6 10.9119L11.17 14.8199C11.4306 14.9387 11.7136 15.0002 12 15.0002C12.2864 15.0002 12.5694 14.9387 12.83 14.8199L21.42 10.9219Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `),
    },
    {
      label: 'Account Settings',
      link: [
        '/' + AppRoutes.dashboard.root,
        AppRoutes.dashboard.accountSettings,
      ],
      icon: this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="size-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13ZM12 13C14.1217 13 16.1566 13.8429 17.6569 15.3431C19.1571 16.8434 20 18.8783 20 21M12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `),
    },
  ]);
}
