import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldErrorDirective } from '../../../shared/directives/field-error/field-error.directive';
import { FieldErrorComponent } from '../../../shared/components/field-error/field-error.component';
import { RouterLink, Router } from '@angular/router';
import { AppRoutes } from '../../../core/enum/app-routes';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { AuthMode } from '../model/auth.model';
import { AuthService, ForgotPasswordRequest } from '@ahmed_gamal_2050/auth';
import { ApiErrorMessageComponent } from '../../../shared/components/api-error-message/api-error-message.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    FieldErrorComponent,
    RouterLink,
    ButtonComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    ApiErrorMessageComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  router = inject(Router);
  private authService = inject(AuthService);

  appRoutes = AppRoutes;
  mode = signal<AuthMode>(AppRoutes.auth.forgotPassword);
  email = signal<string>('');
  isLoading = signal(false);
  errorMessage = signal('');

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  handleChangeMode(mode: AuthMode) {
    this.mode.set(mode);
  }

  continue() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    const email = this.forgotPasswordForm.value.email!;

    const request: ForgotPasswordRequest = { email };

    this.authService.forgotPassword(request).subscribe({
      next: () => {
        this.email.set(email);
        this.isLoading.set(false);
        this.mode.set(AppRoutes.auth.verifyOtp);
      },
      error: error => {
        this.isLoading.set(false);
        this.errorMessage.set(error.apiErrorMessage || 'Something went wrong');
      },
    });
  }
}
