import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FieldErrorDirective } from './field-error.directive';

@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="test" appFieldError />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FieldErrorDirective],
})
class TestComponent {
  form = new FormGroup({
    test: new FormControl(''),
  });
}

describe('FieldErrorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: FieldErrorDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const inputElement: DebugElement = fixture.debugElement.query(
      By.directive(FieldErrorDirective)
    );
    directive = inputElement.injector.get(FieldErrorDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
