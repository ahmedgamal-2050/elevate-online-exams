import {
  Component,
  OnInit,
  OnDestroy,
  output,
  input,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldErrorDirective } from '../../../shared/directives/field-error/field-error.directive';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../core/enum/app-routes';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthMode } from '../model/auth.model';
import {
  AuthService,
  ForgotPasswordRequest,
  VerifyOtpRequest,
} from '@ahmed_gamal_2050/auth';
import { ApiErrorMessageComponent } from '../../../shared/components/api-error-message/api-error-message.component';

@Component({
  selector: 'app-verify-otp',
  imports: [
    ReactiveFormsModule,
    FieldErrorDirective,
    RouterLink,
    ButtonComponent,
    ApiErrorMessageComponent,
  ],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css',
})
export class VerifyOtpComponent implements OnInit, OnDestroy {
  changeMode = output<AuthMode>();
  email = input.required<string>();

  private authService = inject(AuthService);
  appRoutes = AppRoutes;
  timer = 60;
  private timerInterval?: number;
  isLoading = signal(false);
  errorMessage = signal('');

  otpForm = new FormGroup({
    digit1: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d$/),
    ]),
    digit2: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d$/),
    ]),
    digit3: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d$/),
    ]),
    digit4: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d$/),
    ]),
    digit5: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d$/),
    ]),
    digit6: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d$/),
    ]),
  });

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    this.timer = 60;
    this.timerInterval = window.setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  onInput(event: Event, currentIndex: number, nextInputId?: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow single digit
    if (value.length > 1) {
      input.value = value.slice(-1);
    }

    // Move to next input if digit entered
    if (value && nextInputId) {
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, currentIndex: number, prevInputId?: string) {
    const input = event.target as HTMLInputElement;

    // Handle backspace to move to previous input
    if (event.key === 'Backspace' && !input.value && prevInputId) {
      const prevInput = document.getElementById(prevInputId);
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text').trim() || '';
    const digits = pastedData.slice(0, 6).split('');

    digits.forEach((digit, index) => {
      const digitKey = `digit${
        index + 1
      }` as keyof typeof this.otpForm.controls;
      const control = this.otpForm.get(digitKey);
      if (control && /^\d$/.test(digit)) {
        control.setValue(digit);
      }
    });

    // Focus the last filled input or next empty one
    const nextEmptyIndex = digits.length < 6 ? digits.length + 1 : 6;
    const nextInput = document.getElementById(`digit${nextEmptyIndex}`);
    if (nextInput) {
      nextInput.focus();
    }
  }

  getOtpValue(): string {
    return Object.values(this.otpForm.value).join('');
  }

  verifyCode() {
    if (this.otpForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    const resetCode = this.getOtpValue();
    const request: VerifyOtpRequest = { resetCode };

    this.authService.verifyOtp(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.changeMode.emit(AppRoutes.auth.resetPassword);
      },
      error: error => {
        this.isLoading.set(false);
        this.errorMessage.set(error.apiErrorMessage || 'Invalid code');
      },
    });
  }

  resendCode() {
    if (this.timer > 0) {
      return;
    }

    this.errorMessage.set('');
    const request: ForgotPasswordRequest = { email: this.email() };

    this.authService.forgotPassword(request).subscribe({
      next: () => {
        this.startTimer();
      },
      error: error => {
        this.errorMessage.set(error.apiErrorMessage || 'Failed to resend code');
      },
    });
  }

  editEmail() {
    // switch to forgot password mode to allow editing email
    this.changeMode.emit(AppRoutes.auth.forgotPassword);
  }
}
