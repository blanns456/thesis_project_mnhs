import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JhsEnrollmentComponent } from './jhs-enrollment/jhs-enrollment.component';
import { ShsEnrollmentComponent } from './shs-enrollment/shs-enrollment.component';
import { TransfereeEnrollmentComponent } from './transferee-enrollment/transferee-enrollment.component';
import { TransfereeShsEnrollmentComponent } from './transferee-shs-enrollment/transferee-shs-enrollment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeStudentComponent } from './dashboard-student/home-student/home-student.component';
import { SidebarComponent } from './dashboard-student/sidebar/sidebar.component';
import { HomeAdminComponent } from './dashboard-admin/home-admin/home-admin.component';
import { SidebarAdminComponent } from './dashboard-admin/sidebar-admin/sidebar-admin.component';
import { NavbarAdminComponent } from './dashboard-admin/navbar-admin/navbar-admin.component';
import { EnrolledStudentsComponent } from './dashboard-admin/enrolled-students/enrolled-students.component';
import { SettingsComponent } from './dashboard-admin/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JhsEnrollmentComponent,
    ShsEnrollmentComponent,
    TransfereeEnrollmentComponent,
    TransfereeShsEnrollmentComponent,
    LoginComponent,
    HomeStudentComponent,
    SidebarComponent,
    HomeAdminComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    EnrolledStudentsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
