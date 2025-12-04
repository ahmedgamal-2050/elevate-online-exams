import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldErrorDirective } from '../../../shared/directives/field-error/field-error.directive';
import { FieldErrorComponent } from '../../../shared/components/field-error/field-error.component';
import { AppRoutes } from '../../../core/enum/app-routes';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LoginRequest } from '@ahmed_gamal_2050/auth';
import { AuthService } from '@ahmed_gamal_2050/auth';
import { AppStorage } from '../../../core/enum/app-storage';
import { ApiErrorMessageComponent } from '../../../shared/components/api-error-message/api-error-message.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    FieldErrorComponent,
    RouterLink,
    ButtonComponent,
    ApiErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword = signal(false);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  appRoutes = AppRoutes;
  authService = inject(AuthService);
  errorMessage = signal('');
  isLoading = signal(false);

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: response => {
        localStorage.setItem(AppStorage.TOKEN, response.token);
        localStorage.setItem(AppStorage.USER_EMAIL, response.email);
        // temporary until I add navigation and toast
        alert('Login successfully');
        this.isLoading.set(false);
      },
      error: error => {
        this.isLoading.set(false);
        this.errorMessage.set(error.apiErrorMessage ?? 'Something went wrong');
      },
    });
  }
}
