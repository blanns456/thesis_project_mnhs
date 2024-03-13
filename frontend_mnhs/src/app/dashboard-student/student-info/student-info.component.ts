import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentSHSControllers } from 'src/app/controllers/shsenrollmentController.component';
import SignaturePad from 'signature_pad';
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

  constructor(
    private http: HttpClient,
    private EnrollmentSHSControllers: EnrollmentSHSControllers,
    private formBuilder: FormBuilder
  ) {}

  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

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

  onEdit() {
    var studentdetails = {
      id: this.studentdata[0].id,
      semester: $('#semester').val(),
      track: $('#track').val(),
      strand: $('#strand').val(),
      firstname: $('#first_name').val(),
      middle_name: $('#middle_name').val(),
      last_name: $('#last_name').val(),
      suffix: $('#suffix').val() === '' ? '' : $('#suffix').val(),
      gender: $('#gender').val(),
      civil_status: $('#civil_status').val(),
      birth_date: $('#b_date').val(),
      birth_place: $('#b_place').val(),
      religion: $('#religion').val(),
      contact_number: $('#number').val(),
      citizenship: $('#citizenship').val(),
      email: $('#email').val(),
      home_address: $('#home_address').val(),
      permanent_address: $('#present_address').val(),
      enrolling_for: $('#enrolling_for').val(),
      major: $('#major').val(),
      elem_school: $('#elementary').val(),
      elem_yr: $('#elementary_yr').val(),
      jhs_school: $('#jhs').val(),
      jhs_yr: $('#jhs_yr').val(),
      father_lastName: $('#father_lastName').val(),
      father_firstName: $('#father_firstName').val(),
      father_middleName: $('#father_middleName').val(),
      father_number: $('#father_number').val(),
      mother_lastName: $('#mother_lastName').val(),
      mother_firstName: $('#mother_firstName').val(),
      mother_middleName: $('#mother_middleName').val(),
      mother_number: $('#mother_number').val(),
      guardian_lastName: $('#guardian_lastName').val(),
      guardian_firstName: $('#guardian_firstName').val(),
      guardian_middleName: $('#guardian_middleName').val(),
      guardian_number: $('#guardian_number').val(),
    };
    this.EnrollmentSHSControllers.updatestudent(
      JSON.stringify(studentdetails)
    ).subscribe((data) => {
      console.log(data);
    });
    // this.EnrollmentSHSControllers.updatestudent(
    //   JSON.stringify(studentdetails)
    // ).subscribe((res) => {
    //   console.log(res);
    //   this.getLoggedInUser.subscribe((res) => {
    //     var data = res;

    //     this.getLoggedInUser(data);
    //     Swal.fire('Success', 'Changes saved!', 'success');
    //     window.location.reload();
    //   });
    // });
  }

  // showPreview(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];
  //     this.uploadForm!.patchValue({
  //       avatar: file,
  //     });
  //     this.uploadForm!.get('avatar')!.updateValueAndValidity();
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageURL = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //     this.patchValue({
  //       profile: file,
  //     });
  //   }
  // }
}
