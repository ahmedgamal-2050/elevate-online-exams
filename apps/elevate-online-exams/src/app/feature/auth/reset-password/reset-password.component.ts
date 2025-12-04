import { Component, inject, input, signal } from '@angular/core';
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
import { AuthService, ResetPasswordRequest } from '@ahmed_gamal_2050/auth';
import { AuthFormService } from '../service/auth-form/auth-form.service';
import { ApiErrorMessageComponent } from '../../../shared/components/api-error-message/api-error-message.component';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    FieldErrorComponent,
    RouterLink,
    ButtonComponent,
    ApiErrorMessageComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly authFormService = inject(AuthFormService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = input.required<string>();
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  appRoutes = AppRoutes;

  resetPasswordForm = new FormGroup(
    {
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.authFormService.passwordMatchValidator }
  );

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const request: ResetPasswordRequest = {
      email: this.email(),
      newPassword: this.resetPasswordForm.value.newPassword!,
    };

    this.authService.resetPassword(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        // Navigate to login or show success
        alert('Password reset successfully');
        this.router.navigate([AppRoutes.auth.root, AppRoutes.auth.login]);
      },
      error: error => {
        this.isLoading.set(false);
        this.errorMessage.set(
          error.apiErrorMessage || 'Failed to reset password'
        );
      },
    });
  }
}
