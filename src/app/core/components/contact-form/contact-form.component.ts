import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Contact } from '../../models/contact.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  @Input() formState: FormGroup = new FormGroup({});
  @Output() save: EventEmitter<Contact> = new EventEmitter();
  constructor() {}

  getFormControl(name: string): AbstractControl | null {
    if (this.formState) {
      return this.formState.get(name);
    }
    return null;
  }

  onSubmit(): void {
    this.save.emit(this.formState.value);
  }
}
