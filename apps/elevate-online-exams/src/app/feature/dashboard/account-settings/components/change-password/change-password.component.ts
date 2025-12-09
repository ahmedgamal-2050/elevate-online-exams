import { Component, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, NgTemplateOutlet],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  passwordForm = input.required<FormGroup>();
  isLoading = input<boolean>();
  changePassword = output<void>();

  showPassword = signal<{
    old: boolean;
    new: boolean;
    confirm: boolean;
  }>({
    old: false,
    new: false,
    confirm: false,
  });

  togglePasswordVisibility(key: 'old' | 'new' | 'confirm') {
    this.showPassword.set({
      ...this.showPassword(),
      [key]: !this.showPassword()[key],
    });
  }
}
