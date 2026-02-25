import { SafeHtml } from '@angular/platform-browser';

export interface MenuItem {
  label: string;
  link: string;
  icon: SafeHtml;
  key: string;
  hasLink: boolean;
}
