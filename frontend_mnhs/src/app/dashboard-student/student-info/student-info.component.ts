import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentSHSControllers } from 'src/app/controllers/shsenrollmentController.component';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
  loggedInUserData: any;
  studentdata: any;
  imageURL: string | undefined;
  uploadForm!: FormGroup;
  signaturePad: any;
  signatureImg: any;
  signatureNeeded: any;
  studata: any;
  router: any;

  constructor(
    private http: HttpClient,
    private EnrollmentSHSControllers: EnrollmentSHSControllers,
    private formBuilder:  FormBuilder
  ) {}


    enrollForm: FormGroup = this.formBuilder.group({
    gradelevel: [''],
    program: [''],
    lrn: [''],
    firstname: [''],
    lastname: [''],
    middlename: [''],
    suffix: [''],
    gender: [''],
    birthdate: [''],
    age: [''],
    birth_place: [''],
    home_address: [''],
    present_address: [''],
    m_tounge: [''],
    email: [''],
    mobile_number: [''],
    ip: [''],
    pantawid: [''],
    school_elem: [''],
    school_schoolyr: [''],
    father_lastName: [''],
    father_firstName: [''],
    father_middleName: [''],
    father_number: [''],
    mother_lastName: [''],
    mother_firstName: [''],
    mother_middleName: [''],
    mother_number: [''],
    guardian_lastName: [''],
    guardian_firstName: [''],
    guardian_middleName: [''],
    guardian_number: [''],
    profile: [''],
    signature: [''],
    semester: [''],
    track: [''],
    strand: [''],
    jhs: [''],
    jhs_yr: [''],
    schoolID: [''],
    lastgradecompl: [''],
    lastschool: [''],
    lastschool_yr: [''],

  });

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      avatar: [''],
    });

    const auth_token = localStorage.getItem('token');

    if (!auth_token) {
      console.error('Authentication token not found.');
      return;
    }

    this.getLoggedInUser(auth_token).subscribe(
      (data) => {
        this.loggedInUserData = data;
      },
      (error) => {
        console.error('Error:', error);
      });
  }

  getLoggedInUser(auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });

    const apiUrl = 'http://127.0.0.1:8000/api/user';
    return this.http.get(apiUrl, { headers: headers });
  }


  loading = false;
   
  savestudent() {
    this.loading = true;

    const submitdata = new FormData();

    submitdata.append('imagefilename', this.enrollForm.controls['profile'].value);
    submitdata.append('schoolID', this.enrollForm.controls['schoolID'].value);
    submitdata.append('lastgradecompl', this.enrollForm.controls['lastgradecompl'].value);
    submitdata.append('lastschool', this.enrollForm.controls['lastschool'].value);
    submitdata.append('lastschool_yr', this.enrollForm.controls['lastschool_yr'].value);
    submitdata.append('semester', this.enrollForm.controls['semester'].value);
    submitdata.append('track', this.enrollForm.controls['track'].value);
    submitdata.append('strand', this.enrollForm.controls['strand'].value);
    submitdata.append('gradelevel', this.enrollForm.controls['gradelevel'].value);
    submitdata.append('major', this.enrollForm.controls['major'].value);
    submitdata.append('lrn', this.enrollForm.controls['lrn'].value);
    submitdata.append('firstname', this.enrollForm.controls['firstname'].value);
    submitdata.append('lastname', this.enrollForm.controls['lastname'].value);
    submitdata.append('middle_name', this.enrollForm.controls['middle_name'].value);
    submitdata.append('suffix', this.enrollForm.controls['suffix'].value);
    submitdata.append('gender', this.enrollForm.controls['gender'].value);
    submitdata.append('civil_status', this.enrollForm.controls['civil_status'].value);
    submitdata.append('age', this.enrollForm.controls['age'].value);
    submitdata.append('birthdate', this.enrollForm.controls['birthdate'].value);
    submitdata.append('birth_place', this.enrollForm.controls['birth_place'].value);
    submitdata.append('email', this.enrollForm.controls['email'].value);
    submitdata.append('mobile_number', this.enrollForm.controls['mobile_number'].value);
    submitdata.append('m_tounge', this.enrollForm.controls['m_tounge'].value);
    submitdata.append('ip', this.enrollForm.controls['ip'].value);
    submitdata.append('pantawid', this.enrollForm.controls['pantawid'].value);
    submitdata.append('home_address', this.enrollForm.controls['home_address'].value);
    submitdata.append('present_address', this.enrollForm.controls['present_address'].value);
    submitdata.append('elementary', this.enrollForm.controls['elementary'].value);
    submitdata.append('elementary_yr', this.enrollForm.controls['elementary_yr'].value);
    submitdata.append('jhs', this.enrollForm.controls['jhs'].value);
    submitdata.append('jhs_yr', this.enrollForm.controls['jhs_yr'].value);
    submitdata.append('father_lastName', this.enrollForm.controls['father_lastName'].value);
    submitdata.append('father_firstName', this.enrollForm.controls['father_firstName'].value);
    submitdata.append('father_middleName', this.enrollForm.controls['father_middleName'].value);
    submitdata.append('father_number', this.enrollForm.controls['father_number'].value);
    submitdata.append('mother_lastName', this.enrollForm.controls['mother_lastName'].value);
    submitdata.append('mother_firstName', this.enrollForm.controls['mother_firstName'].value);
    submitdata.append('mother_middleName', this.enrollForm.controls['mother_middleName'].value);
    submitdata.append('mother_number', this.enrollForm.controls['mother_number'].value);
    submitdata.append('guardian_lastName', this.enrollForm.controls['guardian_lastName'].value);
    submitdata.append('guardian_firstName', this.enrollForm.controls['guardian_firstName'].value);
    submitdata.append('guardian_middleName', this.enrollForm.controls['guardian_middleName'].value);
    submitdata.append('guardian_number', this.enrollForm.controls['guardian_number'].value);
    submitdata.append('signature', this.enrollForm.controls['signature'].value);


    this.EnrollmentSHSControllers.createEnrollmentSHS(submitdata).subscribe(
      (e) => {
        this.studata = e;
        if (this.studata['user'] == 'success') {
          window.location.reload();
          Swal.fire({
            title: 'Success',
            text: 'Changes Saved',
            icon: 'success',
          });
        }
      });
  }

}
