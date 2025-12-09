import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-account-settings-sidebar',
  imports: [],
  templateUrl: './account-settings-sidebar.component.html',
  styleUrl: './account-settings-sidebar.component.css',
  host: {
    class: 'flex-shrink-0 bg-white p-6 flex flex-col justify-between',
  },
})
export class AccountSettingsSidebarComponent {
  activeTab = input<'profile' | 'password'>('profile');
  changeActiveTab = output<'profile' | 'password'>();
  triggerLogout = output<void>();

  setActiveTab(tab: 'profile' | 'password') {
    this.changeActiveTab.emit(tab);
  }

  logout() {
    this.triggerLogout.emit();
  }
}
