import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { DebugElement } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let component: ContactFormComponent;
  let rootElement: DebugElement;
  let email: AbstractControl;
  let nip: AbstractControl;

  const mockFormState = new FormGroup({
    name: new FormControl('Dayron R.'),
    nip: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d*$/),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    web: new FormControl(''),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    component.formState = mockFormState;
    fixture.detectChanges();
  });

  beforeEach(() => {
    email = component.formState.controls.email;
    nip = component.formState.controls.nip;
  });

  it('should render all form controls', () => {
    const form = rootElement.nativeElement.querySelector('#formContact');
    const formControls = form.querySelectorAll('input');
    expect(formControls.length).toBe(5);
  });

  it('should form be invalid when init', () => {
    expect(component.formState.invalid).toBeTruthy();
  });

  it('should be form submit button inactive when form is invalid', () => {
    const submitButton = rootElement.query(By.css('.btn-primary'))
      .nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should email field display an invalid format validation message', () => {
    email.markAsDirty();
    email.markAsTouched();
    email.setValue('test@');
    expect(email.hasError('email')).toBeTruthy();
    fixture.detectChanges();
    const errorInvalidMessage = rootElement.query(By.css('#errorEmailInvalid'));
    expect(errorInvalidMessage.nativeElement.textContent).toContain(
      'Email is invalid'
    );
  });

  it('should email field display a required validation message', () => {
    email.markAsDirty();
    email.markAsTouched();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
    fixture.detectChanges();
    const errorRequiredMessage = rootElement.query(
      By.css('#errorEmailRequired')
    );
    expect(errorRequiredMessage.nativeElement.textContent).toContain(
      'Email is required'
    );
  });

  it('should NIP field display must be a number validation message', () => {
    expect(nip.invalid).toBeTruthy();
    nip.setValue('aaa');
    nip.markAsTouched();
    nip.markAsDirty();
    fixture.detectChanges();
    expect(
      rootElement.query(By.css('[formControlName="nip"]')).nativeElement.value
    ).toContain('aaa');
    expect(
      rootElement.query(By.css('#patternValidationMessage')).nativeElement
        .textContent
    ).toContain('NIP must be a number');
  });

  it('should NIP field display a required validation message', () => {
    nip.setValue('');
    expect(nip.hasError('required')).toBeTruthy();
    nip.markAsDirty();
    fixture.detectChanges();
    expect(
      rootElement.query(By.css('#requiredValidationMessage')).nativeElement
        .textContent
    ).toContain('NIP is required');
  });

  it('should NIP field display a minLength validation message', () => {
    nip.setValue('123');
    expect(nip.hasError('minlength')).toBeTruthy();
    nip.markAsDirty();
    fixture.detectChanges();
    expect(
      rootElement.query(By.css('#minLengthValidationMessage')).nativeElement
        .textContent
    ).toContain('NIP must be a 10 numbers length');
  });

  it('should NIP field display a maxLength validation message', () => {
    nip.setValue('123456789011');
    expect(nip.hasError('maxlength')).toBeTruthy();
    nip.markAsDirty();
    fixture.detectChanges();
    expect(
      rootElement.query(By.css('#maxLengthValidationMessage')).nativeElement
        .textContent
    ).toContain('NIP must be up to 10 numbers.');
  });
});
