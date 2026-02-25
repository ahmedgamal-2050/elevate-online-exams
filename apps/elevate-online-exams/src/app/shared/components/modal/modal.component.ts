import { afterEveryRender, Component, computed, inject } from '@angular/core';
import { ModalService } from './service/modal.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [NgTemplateOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private modal = inject(ModalService);

  template = computed(() => this.modal.dialog().template);
  dialogClass = computed<string>(() => this.modal.dialog().class ?? '');

  constructor() {
    afterEveryRender(() => {
      const dialog = document.getElementById(
        'reusable-dialog'
      ) as HTMLDialogElement;
      if (this.modal.dialog().isOpen) {
        dialog?.showModal();
      } else {
        dialog?.close();
      }
    });
  }

  closeDialog() {
    this.modal.dialog.set({
      isOpen: false,
    });
  }
}
