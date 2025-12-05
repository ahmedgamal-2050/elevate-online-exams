import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  header = signal<{ title: string; icon: string; hasBackButton: boolean }>({
    title: '',
    icon: '',
    hasBackButton: false,
  });
}
