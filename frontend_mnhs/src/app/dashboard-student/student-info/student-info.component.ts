import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  enrollForm: FormGroup = this.formBuilder.group({
    semester: ['', [Validators.required]],
    track: ['', [Validators.required]],
    strand: ['', [Validators.required]],

    gradelevel: ['', [Validators.required]],
    major: ['', [Validators.required]],
    lrn: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    middle_name: [''],
    suffix: [''],
    civil_status: [''],
    gender: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    age: [''],
    birth_place: ['', [Validators.required]],
    home_address: ['', [Validators.required]],
    present_address: ['', [Validators.required]],
    m_tounge: [''],
    email: ['', [Validators.required]],
    mobile_number: ['', [Validators.required]],
    ip: ['', Validators.required],
    pantawid: ['', [Validators.required]],
    elementary: ['', [Validators.required]],
    elementary_yr: ['', [Validators.required]],
    jhs: ['', [Validators.required]],
    jhs_yr: ['', [Validators.required]],
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
    profile: ['', [Validators.required]],
    signature: ['', [Validators.required]],
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
        console.log('User Data:', data);
        this.loggedInUserData = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getLoggedInUser(auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });

    const apiUrl = 'http://127.0.0.1:8000/api/user';
    return this.http.get(apiUrl, { headers: headers });
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  // onEdit() {
  //   var studentdetails = {
  //     id: this.studentdata[0].id,
  //     firstname: $('#first_name').val(),
  //     middle_name: $('#middle_name').val(),
  //     last_name: $('#last_name').val(),
  //     suffix: $('#suffix').val() === '' ? '' : $('#suffix').val(),
  //     gender: $('#gender').val(),
  //     civil_status: $('#civil_status').val(),
  //     birth_date: $('#birth_date').val(),
  //     birth_place: $('#birth_place').val(),
  //     religion: $('#religion').val(),
  //     contact_number: $('#contact_number').val(),
  //     citizenship: $('#citizenship').val(),
  //     email: $('#email').val(),
  //     home_address: $('#home_address').val(),
  //     permanent_address: $('#permanent_address').val(),
  //     elem_school: $('#elem_school').val(),
  //     elem_yrgrad: $('#elem_yrgrad').val(),
  //     jhs_school: $('#jhs_school').val(),
  //     jhs_yrgrad: $('#jhs_yrgrad').val(),
  //     shs_school: $('#shs_school').val(),
  //     shs_yrgrad: $('#shs_yrgrad').val(),
  //     lastschoolattended: $('#lastschoolattended').val(),
  //     lastschool_yrattend: $('#lastschool_yrattend').val(),
  //     parent_name: $('#parent_name').val(),
  //     employed_where: $('#employed_where').val(),
  //     parent_occupation: $('#parent_occupation').val(),
  //     parent_contact: $('#parent_contact').val(),
  //     parent_home_address: $('#parent_home_address').val(),
  //     parent_permanent_address: $('#parent_permanent_address').val(),
  //   };
  //   this.collegeController
  //     .updatestudent(JSON.stringify(studentdetails))
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.logincontroller.reloadstudentdatainfo().subscribe((res) => {
  //         var data = res;

  //         this.logincontroller.setdata(data);
  //         Swal.fire('Success', 'Changes saved!', 'success');
  //         window.location.reload();
  //         // this.studentdata = this.logincontroller.getuserdetails();
  //       });
  //     });
  // }

  showPreview(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.uploadForm!.patchValue({
        avatar: file,
      });
      this.uploadForm!.get('avatar')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.enrollForm.patchValue({
        profile: file,
      });
    }
  }
}
