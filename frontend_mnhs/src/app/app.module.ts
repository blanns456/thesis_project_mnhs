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
import { NavbarComponent } from './dashboard-student/navbar/navbar.component';
import { StudentInfoComponent } from './dashboard-student/student-info/student-info.component';
import { AccountSettingsComponent } from './dashboard-student/account-settings/account-settings.component';
import { PendingStudentsComponent } from './dashboard-admin/pending-students/pending-students.component';
import { DeclineStudentsComponent } from './dashboard-admin/decline-students/decline-students.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { InputOtpModule } from 'primeng/inputotp';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SchoolYearSettingsComponent } from './dashboard-admin/school-year-settings/school-year-settings.component';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { ParentComponent } from './dashboard-student/parent/parent.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

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
    NavbarComponent,
    StudentInfoComponent,
    AccountSettingsComponent,
    PendingStudentsComponent,
    DeclineStudentsComponent,
    ForgotPasswordComponent,
    SchoolYearSettingsComponent,
    ParentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InputOtpModule,
    ToastModule,
    ButtonModule,
    BrowserAnimationsModule,
    MessagesModule,
    PasswordModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ProgressSpinnerModule,
    CardModule,
    CalendarModule,
    TreeTableModule,
    TableModule,
    ConfirmPopupModule

  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
