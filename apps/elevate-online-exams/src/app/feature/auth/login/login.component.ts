import { Component, signal } from '@angular/core';
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

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    FieldErrorComponent,
    RouterLink,
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

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
  }
}
