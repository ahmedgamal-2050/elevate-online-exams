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
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  router = inject(Router);

  appRoutes = AppRoutes;
  mode = signal<AuthMode>(AppRoutes.auth.forgotPassword);

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

    const email = this.forgotPasswordForm.value.email;
    console.log('Sending OTP to:', email);

    // switch to verify OTP mode
    this.mode.set(AppRoutes.auth.verifyOtp);
  }
}
