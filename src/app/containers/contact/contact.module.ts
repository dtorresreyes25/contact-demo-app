import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from 'src/app/core/components/contact-form/contact-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ContactComponent, ContactFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  exports: [ContactComponent],
})
export class ContactModule {}
