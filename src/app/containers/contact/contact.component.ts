import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/core/services/contact-service';

@Component({
  selector: 'app-contact',
  template: `
    <contact-form
      [formState]="formGroup"
      (save)="handleSubmit($event)"
    ></contact-form>
  `,
})
export class ContactComponent {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.formGroup = fb.group({
      name: [''],
      nip: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d*$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      web: [''],
    });
  }
  handleSubmit(contact: any): void {
    this.contactService.save(contact).subscribe((response) => {
      // TODO implement some stuff here...
    });
  }
}
