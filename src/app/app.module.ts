import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactModule } from './containers/contact/contact.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ContactModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
