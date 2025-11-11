import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  buttonType = input.required<string>();
  buttonClass = input.required<string>();
  hasDefaultClass = input<boolean>(false);
  defaultButtonClass = 'w-full bg-blue-600 text-white py-3 text-sm font-medium';
}
