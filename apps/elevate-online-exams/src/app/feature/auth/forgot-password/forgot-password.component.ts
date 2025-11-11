import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    FieldErrorComponent,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  router = inject(Router);
  appRoutes = AppRoutes;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  continue() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email = this.forgotPasswordForm.value.email;
    console.log('Sending OTP to:', email);

    // Navigate to verify OTP page
    this.router.navigate([
      '/' + this.appRoutes.auth.root,
      this.appRoutes.auth.verifyOtp,
    ]);
  }
}
