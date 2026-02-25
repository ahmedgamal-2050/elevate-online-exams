import { Injectable, signal, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  dialog = signal<{
    template?: TemplateRef<any> | undefined;
    isOpen: boolean;
    class?: string;
  }>({
    template: undefined,
    isOpen: false,
    class: '',
  });
}
