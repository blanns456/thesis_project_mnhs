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
import { SettingsComponent } from './dashboard-admin/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'JHS/enrollment', component: JhsEnrollmentComponent },
  { path: 'SHS/enrollment', component: ShsEnrollmentComponent },
  { path: 'transferee/enrollment', component: TransfereeEnrollmentComponent },
  {
    path: 'transferee/shs/enrollment',
    component: TransfereeShsEnrollmentComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // student dashboard
  {
    path: 'student/home',
    component: HomeStudentComponent,
  },
  {
    path: 'admin/home',
    component: HomeAdminComponent,
  },
  {
    path: 'admin/enrolled-students',
    component: EnrolledStudentsComponent,
  },
  {
    path: 'admin/settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
