import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderService } from '../../../shared/components/header/service/header.service';
import { Router } from '@angular/router';
import { AuthService } from '@ahmed_gamal_2050/auth';
import { AppRoutes } from '../../../core/enum/app-routes';
import { delay, of, Subscription } from 'rxjs';
import { ModalService } from '../../../shared/components/modal/service/modal.service';
import { User } from '../../auth/auth.model';
import { AppStorage } from '../../../core/enum/app-storage';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AccountSettingsSidebarComponent } from './components/account-settings-sidebar/account-settings-sidebar.component';

@Component({
  selector: 'app-account-settings',
  imports: [
    ReactiveFormsModule,
    ProfileComponent,
    ChangePasswordComponent,
    AccountSettingsSidebarComponent,
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  private headerService = inject(HeaderService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private modal = inject(ModalService);

  appRoutes = AppRoutes;

  deleteAccountModal = viewChild<TemplateRef<any>>('deleteAccountModal');

  activeTab = signal<'profile' | 'password'>('profile');
  isLoading = signal(false);
  user = signal<User | null>(
    JSON.parse(localStorage.getItem(AppStorage.USER) ?? '') ?? null
  );

  subscription: Subscription = new Subscription();

  profileForm = new FormGroup({
    firstName: new FormControl(this.user()?.firstName ?? '', [
      Validators.required,
    ]),
    lastName: new FormControl(this.user()?.lastName ?? '', [
      Validators.required,
    ]),
    username: new FormControl(this.user()?.username ?? '', [
      Validators.required,
    ]),
    email: new FormControl(this.user()?.email ?? '', [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(this.user()?.phone ?? '', [Validators.required]),
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rePassword: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.updateHeader();
  }

  updateHeader() {
    this.headerService.header.set({
      title: 'Account Settings',
      icon: `
        <svg width="45" height="45" viewBox="0 0 45 45" class="size-11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 23.4375C26.8492 23.4375 30.375 19.9117 30.375 15.5625C30.375 11.2133 26.8492 7.6875 22.5 7.6875C18.1508 7.6875 14.625 11.2133 14.625 15.5625C14.625 19.9117 18.1508 23.4375 22.5 23.4375ZM22.5 23.4375C25.4837 23.4375 28.3452 24.6227 30.4549 26.7324C32.5646 28.8421 33.75 31.7036 33.75 34.6875M22.5 23.4375C19.5163 23.4375 16.6548 24.6227 14.5451 26.7324C12.4354 28.8421 11.25 31.7036 11.25 34.6875" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
      hasBackButton: true,
    });
  }

  setActiveTab(tab: 'profile' | 'password') {
    this.activeTab.set(tab);
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      // Simulate API call
      this.subscription.add(
        of(null)
          .pipe(delay(1000))
          .subscribe(() => {
            alert('Profile updated successfully');
            this.isLoading.set(false);
          })
      );
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { password, rePassword } = this.passwordForm.value;
      if (password !== rePassword) {
        alert('Passwords do not match');
        return;
      }
      this.isLoading.set(true);
      // Simulate API call
      this.subscription.add(
        of(null)
          .pipe(delay(1000))
          .subscribe(() => {
            alert('Password changed successfully');
            this.passwordForm.reset();
            this.isLoading.set(false);
          })
      );
    }
  }

  openDeleteAccountModal() {
    this.modal.dialog.set({
      template: this.deleteAccountModal(),
      isOpen: true,
      class: 'w-[34.875rem]',
    });
  }

  logout() {
    this.subscription.add(
      this.authService.logout().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/' + AppRoutes.auth.root, AppRoutes.auth.login]);
      })
    );
  }

  closeModal() {
    this.modal.dialog.set({
      isOpen: false,
    });
  }

  deleteAccount() {
    this.isLoading.set(true);
    // Simulate API call
    this.subscription.add(
      of(null)
        .pipe(delay(1000))
        .subscribe(() => {
          alert('Account deleted');
          this.logout();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
