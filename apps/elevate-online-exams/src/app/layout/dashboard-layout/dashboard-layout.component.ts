import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppRoutes } from '../../core/enum/app-routes';
import { SideNavbarComponent } from '../../shared/components/side-navbar/side-navbar.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeaderService } from '../../shared/components/header/service/header.service';

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
  private headerService = inject(HeaderService);

  sideNavLinks = signal<{ label: string; link: string; icon: SafeHtml }[]>([
    {
      label: 'Diplomas',
      link: '/' + AppRoutes.dashboard.diplomas,
      icon: this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="size-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 9.99987V15.9999M6 12.4999V15.9999C6 16.7955 6.63214 17.5586 7.75736 18.1212C8.88257 18.6838 10.4087 18.9999 12 18.9999C13.5913 18.9999 15.1174 18.6838 16.2426 18.1212C17.3679 17.5586 18 16.7955 18 15.9999V12.4999M21.42 10.9219C21.599 10.8429 21.7509 10.7131 21.8569 10.5487C21.9629 10.3842 22.0183 10.1923 22.0163 9.99661C22.0143 9.80095 21.9549 9.61019 21.8455 9.44795C21.7362 9.28571 21.5816 9.15913 21.401 9.08387L12.83 5.17987C12.5694 5.06102 12.2864 4.99951 12 4.99951C11.7136 4.99951 11.4306 5.06102 11.17 5.17987L2.6 9.07987C2.42196 9.15784 2.27051 9.286 2.16416 9.44868C2.05781 9.61136 2.00117 9.80151 2.00117 9.99587C2.00117 10.1902 2.05781 10.3804 2.16416 10.5431C2.27051 10.7057 2.42196 10.8339 2.6 10.9119L11.17 14.8199C11.4306 14.9387 11.7136 15.0002 12 15.0002C12.2864 15.0002 12.5694 14.9387 12.83 14.8199L21.42 10.9219Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `),
    },
    {
      label: 'Account Settings',
      link: '/' + AppRoutes.dashboard.accountSettings,
      icon: this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="size-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13ZM12 13C14.1217 13 16.1566 13.8429 17.6569 15.3431C19.1571 16.8434 20 18.8783 20 21M12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `),
    },
  ]);

  constructor() {
    this.headerService.header.set({
      title: 'Diplomas',
      icon: `
        <svg width="45" height="45" viewBox="0 0 45 45" class="size-11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.25 18.7502V30.0002M11.25 23.4377V30.0002C11.25 31.492 12.4353 32.9228 14.5451 33.9777C16.6548 35.0326 19.5163 35.6252 22.5 35.6252C25.4837 35.6252 28.3452 35.0326 30.455 33.9777C32.5647 32.9228 33.75 31.492 33.75 30.0002V23.4377M40.1625 20.4789C40.4982 20.3309 40.783 20.0876 40.9818 19.7792C41.1805 19.4708 41.2844 19.1109 41.2806 18.7441C41.2768 18.3772 41.1655 18.0195 40.9604 17.7153C40.7553 17.4111 40.4655 17.1738 40.1269 17.0327L24.0563 9.71268C23.5677 9.48983 23.037 9.37451 22.5 9.37451C21.963 9.37451 21.4323 9.48983 20.9438 9.71268L4.875 17.0252C4.54119 17.1714 4.25722 17.4117 4.05781 17.7167C3.85841 18.0217 3.75221 18.3783 3.75221 18.7427C3.75221 19.1071 3.85841 19.4636 4.05781 19.7687C4.25722 20.0737 4.54119 20.314 4.875 20.4602L20.9438 27.7877C21.4323 28.0105 21.963 28.1259 22.5 28.1259C23.037 28.1259 23.5677 28.0105 24.0563 27.7877L40.1625 20.4789Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
      hasBackButton: false,
    });
  }
}
