import { Component, input } from '@angular/core';

@Component({
  selector: 'app-api-error-message',
  imports: [],
  templateUrl: './api-error-message.component.html',
  styleUrl: './api-error-message.component.css',
})
export class ApiErrorMessageComponent {
  errorMessage = input<string | null>(null);
}
