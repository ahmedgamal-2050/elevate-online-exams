import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldErrorDirective } from '../../../shared/directives/field-error/field-error.directive';
import { FieldErrorComponent } from '../../../shared/components/field-error/field-error.component';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../core/enum/app-routes';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthFormService } from '../service/auth-form/auth-form.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    FieldErrorComponent,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly authFormService = inject(AuthFormService);

  showPassword = signal(false);
  showConfirmPassword = signal(false);
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

    console.log(this.resetPasswordForm.value);
    // Add reset password logic here
  }
}
