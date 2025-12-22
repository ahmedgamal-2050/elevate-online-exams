import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorComponent } from './field-error.component';
import { ControlContainer, FormControl } from '@angular/forms';

describe('FieldError', () => {
  let component: FieldErrorComponent;
  let fixture: ComponentFixture<FieldErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorComponent],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: {
              get: () => new FormControl(''),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldErrorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('controlName', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
