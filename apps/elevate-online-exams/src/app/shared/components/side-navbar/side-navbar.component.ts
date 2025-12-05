import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppRoutes } from '../../../core/enum/app-routes';
import { MenuItem } from '../menu/menu.model';
import { AuthService } from '@ahmed_gamal_2050/auth';

@Component({
  selector: 'app-side-navbar',
  imports: [RouterLink, RouterLinkActive, MenuComponent],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
})
export class SideNavbarComponent {
  private sanitizer = inject(DomSanitizer);
  private authService = inject(AuthService);
  private router = inject(Router);

  sideNavLinks = input<{ label: string; link: string[]; icon: SafeHtml }[]>([]);

  dropdownItems = signal<MenuItem[]>([
    {
      label: 'Account',
      link: '/' + AppRoutes.dashboard.account,
      icon: this.sanitizer.bypassSecurityTrustHtml(
        `
        <svg width="18" height="18" class="size-[1.125rem]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 9.75C11.0711 9.75 12.75 8.07107 12.75 6C12.75 3.92893 11.0711 2.25 9 2.25C6.92893 2.25 5.25 3.92893 5.25 6C5.25 8.07107 6.92893 9.75 9 9.75ZM9 9.75C10.5913 9.75 12.1174 10.3821 13.2426 11.5074C14.3679 12.6326 15 14.1587 15 15.75M9 9.75C7.4087 9.75 5.88258 10.3821 4.75736 11.5074C3.63214 12.6326 3 14.1587 3 15.75" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
      ),
      key: 'account',
      hasLink: true,
    },
    {
      label: 'Logout',
      link: '',
      icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg width="18" height="18" viewBox="0 0 18 18" class="size-[1.125rem]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12.75L2.25 9M2.25 9L6 5.25M2.25 9H11.25M11.25 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25H11.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `),
      key: 'logout',
      hasLink: false,
    },
  ]);

  handleMenuAction(itemKey: string) {
    switch (itemKey) {
      case 'logout': {
        this.logout();
      }
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/' + AppRoutes]);
    });
  }
}
