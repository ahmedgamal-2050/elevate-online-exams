import { Component, signal, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  dropdownItems = input<MenuItem[]>([]);
  menuAction = output<string>();
  isDialogOpen = signal(false);

  toggleDialog() {
    this.isDialogOpen.set(!this.isDialogOpen());
  }

  handleMenuAction(itemKey: string) {
    this.menuAction.emit(itemKey);
  }
}
