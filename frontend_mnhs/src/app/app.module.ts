import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JhsEnrollmentComponent } from './jhs-enrollment/jhs-enrollment.component';
import { ShsEnrollmentComponent } from './shs-enrollment/shs-enrollment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JhsEnrollmentComponent,
    ShsEnrollmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
