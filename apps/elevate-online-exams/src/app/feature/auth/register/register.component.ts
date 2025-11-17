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
import { AuthService } from 'libs/auth/src/lib/auth/services/auth.service';
import { RegisterRequest } from 'libs/auth/src/lib/auth/interfaces/auth-requests';
import { AppStorage } from '../../../core/enum/app-storage';
import { AuthAdaptor } from 'libs/auth/src/lib/auth/interfaces/auth-responses';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    FieldErrorComponent,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authFormService = inject(AuthFormService);
  private readonly authService = inject(AuthService);

  showPassword = signal(false);
  showConfirmPassword = signal(false);
  selectedCountryCode = signal('+20');
  countryName = signal('EG');
  isLoading = signal(false);
  errorMessage = signal('');

  appRoutes = AppRoutes;

  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.authFormService.passwordMatchValidator }
  );

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.authService
      .register(this.registerForm.value as RegisterRequest)
      .subscribe({
        next: (response: AuthAdaptor) => {
          console.log(
            '🚀 ~ RegisterComponent ~ register ~ response:',
            response
          );
          localStorage.setItem(AppStorage.TOKEN, response.token);
          alert('Account created successfully');
          this.isLoading.set(false);
        },
        error: error => {
          this.errorMessage.set(error.error.message ?? 'Something went wrong');
          this.isLoading.set(false);
        },
      });
  }
}
