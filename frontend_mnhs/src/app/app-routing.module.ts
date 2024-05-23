import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JhsEnrollmentComponent } from './jhs-enrollment/jhs-enrollment.component';
import { ShsEnrollmentComponent } from './shs-enrollment/shs-enrollment.component';
import { TransfereeEnrollmentComponent } from './transferee-enrollment/transferee-enrollment.component';
import { TransfereeShsEnrollmentComponent } from './transferee-shs-enrollment/transferee-shs-enrollment.component';
import { LoginComponent } from './login/login.component';
import { HomeStudentComponent } from './dashboard-student/home-student/home-student.component';
import { HomeAdminComponent } from './dashboard-admin/home-admin/home-admin.component';
import { EnrolledStudentsComponent } from './dashboard-admin/enrolled-students/enrolled-students.component';
import { PendingStudentsComponent } from './dashboard-admin/pending-students/pending-students.component';
import { DeclineStudentsComponent } from './dashboard-admin/decline-students/decline-students.component';
import { SettingsComponent } from './dashboard-admin/settings/settings.component';
import { StudentInfoComponent } from './dashboard-student/student-info/student-info.component';
import { AccountSettingsComponent } from './dashboard-student/account-settings/account-settings.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'JHS/enrollment', component: JhsEnrollmentComponent, title: 'JHS Enrollment' },
  { path: 'SHS/enrollment', component: ShsEnrollmentComponent, title: 'SHS Enrollment' },
  { path: 'transferee/enrollment', component: TransfereeEnrollmentComponent, title: 'Transferee JHS' },
  {
    path: 'transferee/shs/enrollment',
    component: TransfereeShsEnrollmentComponent,
    title: 'Transferee SHS'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login '
  },
  // student dashboard
  {
    path: 'student/home',
    component: HomeStudentComponent , canActivate: [AuthGuard],
  },
  {
    path: 'admin/home',
    component: HomeAdminComponent , canActivate: [AuthGuard],
  },
  {
    path: 'admin/enrolled-students' , canActivate: [AuthGuard],
    component: EnrolledStudentsComponent,
  },
  {
    path: 'admin/pending-students',
    component: PendingStudentsComponent,
  },
  {
    path: 'admin/declined-students',
    component: DeclineStudentsComponent,
  },
  {
    path: 'admin/settings',
    component: SettingsComponent,
  },
  {
    path: 'student/information' , canActivate: [AuthGuard],
    component: StudentInfoComponent,
  },
  {
    path: 'student/settings' , canActivate: [AuthGuard],
    component: AccountSettingsComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
