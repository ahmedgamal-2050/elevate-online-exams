import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileForm = input.required<FormGroup>();
  isLoading = input<boolean>();
  showDeleteAccountModal = output<void>();
  updateProfile = output<void>();

  saveProfile() {
    this.updateProfile.emit();
  }

  openDeleteAccountModal() {
    this.showDeleteAccountModal.emit();
  }
}
