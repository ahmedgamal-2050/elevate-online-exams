import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

@Directive({
  selector: '[formControlName][appFieldError]',
  standalone: true,
})
export class FieldErrorDirective implements OnInit, OnDestroy {
  errorClass = input<string>('appFieldError');
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private controlDir = inject(NgControl);

  private statusChangeSub?: Subscription;

  ngOnInit(): void {
    const control = this.controlDir.control;
    if (!control) return;

    // Subscribe to control state changes
    this.statusChangeSub = merge(
      control.valueChanges,
      control.statusChanges
    ).subscribe(() => {
      const isInvalid = control.invalid && (control.dirty || control.touched);
      this.toggleErrorStyle(isInvalid);
    });
  }

  private toggleErrorStyle(isError: boolean): void {
    if (isError) {
      this.renderer.addClass(this.el.nativeElement, this.errorClass());
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.errorClass());
    }
  }

  ngOnDestroy(): void {
    this.statusChangeSub?.unsubscribe();
  }
}
