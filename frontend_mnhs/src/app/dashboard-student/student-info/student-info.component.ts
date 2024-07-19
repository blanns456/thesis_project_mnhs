import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentSHSControllers } from 'src/app/controllers/shsenrollmentController.component';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { error } from 'jquery';
import SignaturePad from 'signature_pad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
  loggedInUserData: any;
  studentdata: any;
  imageURL: any;
  uploadForm!: FormGroup;
  signatureImg: any;
  studata: any;
  showupdateDIalog: boolean = false;
  studid: any;
  // enrollForm: FormGroup;
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private EnrollmentSHSControllers: EnrollmentSHSControllers,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  enrollForm: FormGroup = this.formBuilder.group({
    studid: [''],
    gradelevel: [''],
    program: [''],
    lrn: [''],
    enrolling_for: [''],
    first_name: [''],
    last_name: [''],
    middle_name: [''],
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
    special_program: [''],
    lastgradecompl: [''],
    elementary: [''],
    elementary_yr: [''],
    last_school: [''],
    last_schoolyr: [''],
  });

  showPreview(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

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

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {}

  moved(event: Event) {}

  clearPad() {
    this.signaturePad.clear();
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      avatar: [''],
    });

    const auth_token = localStorage.getItem('token');

    if (!auth_token) {
      console.error('Authentication token not found.');
      return;
    }

    this.getLoggedInUser(auth_token).subscribe({
      next: (data) => {
        this.loggedInUserData = data;
        // console.log(this.loggedInUserData);
        this.enrollForm.patchValue({
          studid: this.loggedInUserData.data[0]?.stud_id,
          lrn: this.loggedInUserData.data[0]?.LRN,
          enrolling_for: this.loggedInUserData.data[0]?.grade_level,
          first_name: this.loggedInUserData.data[0]?.firstname,
          last_name: this.loggedInUserData.data[0]?.lastname,
          middle_name: this.loggedInUserData.data[0]?.middlename,
          suffix: this.loggedInUserData.data[0]?.suffix,
          gender: this.loggedInUserData.data[0]?.gender,
          birthdate: this.loggedInUserData.data[0]?.birthdate,
          age: this.loggedInUserData.data[0]?.age,
          birth_place: this.loggedInUserData.data[0]?.birth_place,
          home_address: this.loggedInUserData.data[0]?.home_address,
          present_address: this.loggedInUserData.data[0]?.present_address,
          m_tounge: this.loggedInUserData.data[0]?.m_tounge,
          email: this.loggedInUserData.data[0]?.email,
          mobile_number: this.loggedInUserData.data[0]?.mobile_number,
          ip: this.loggedInUserData.data[0]?.ip,
          pantawid: this.loggedInUserData.data[0]?.pantawid,
          father_lastName: this.loggedInUserData.data[0]?.father_lastName,
          father_firstName: this.loggedInUserData.data[0]?.father_firstName,
          father_middleName: this.loggedInUserData.data[0]?.father_middleName,
          father_number: this.loggedInUserData.data[0]?.father_number,
          mother_lastName: this.loggedInUserData.data[0]?.mother_lastName,
          mother_firstName: this.loggedInUserData.data[0]?.mother_firstName,
          mother_middleName: this.loggedInUserData.data[0]?.mother_middleName,
          mother_number: this.loggedInUserData.data[0]?.mother_number,
          guardian_lastName: this.loggedInUserData.data[0]?.guardian_lastName,
          guardian_firstName: this.loggedInUserData.data[0]?.guardian_firstName,
          guardian_middleName:
            this.loggedInUserData.data[0]?.guardian_middleName,
          guardian_number: this.loggedInUserData.data[0]?.guardian_number,
          semester: this.loggedInUserData.data[0]?.semester,
          track: this.loggedInUserData.data[0]?.track,
          strand: this.loggedInUserData.data[0]?.strand,
          jhs: this.loggedInUserData.data[0]?.school_jhs,
          jhs_yr: this.loggedInUserData.data[0]?.jhs_schoolyr,
          schoolID: this.loggedInUserData.data[0]?.school_id,
          special_program: this.loggedInUserData.data[0]?.special_program,
          lastgradecompl: this.loggedInUserData.data[0]?.lastgrade_completed,
          elementary: this.loggedInUserData.data[0]?.school_elem,
          elementary_yr: this.loggedInUserData.data[0]?.elem_schoolyr,
          last_school: this.loggedInUserData.data[0]?.last_school,
          last_schoolyr: this.loggedInUserData.data[0]?.last_schoolyr,
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
      },
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

  updateInfoDIalog() {
    this.showupdateDIalog = true;
  }

  updateInfos() {
    const base64 = this.signaturePad.toDataURL();
    this.signatureImg = base64;
    this.signatureNeeded = this.signaturePad.isEmpty();
    this.loading = true;
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }

    this.enrollForm.patchValue({
      signature: this.signatureImg,
    });

    if (!this.enrollForm) {
      console.error('Form group not initialized.');
      return;
    }

    const submitdata = new FormData();

    submitdata.append('studid', this.enrollForm.controls['studid'].value);
    submitdata.append('profile', this.enrollForm.controls['profile'].value);
    submitdata.append(
      'schoolID',
      this.enrollForm.controls['schoolID'].value || ''
    );
    submitdata.append(
      'lastgradecompl',
      this.enrollForm.controls['lastgradecompl'].value || ''
    );
    submitdata.append(
      'last_school',
      this.enrollForm.controls['last_school'].value || ''
    );
    submitdata.append(
      'last_schoolyr',
      this.enrollForm.controls['last_schoolyr'].value || ''
    );
    submitdata.append(
      'semester',
      this.enrollForm.controls['semester'].value || ''
    );
    submitdata.append('track', this.enrollForm.controls['track'].value || '');
    submitdata.append('strand', this.enrollForm.controls['strand'].value || '');
    submitdata.append(
      'gradelevel',
      this.enrollForm.controls['gradelevel'].value || ''
    );
    // submitdata.append('major', this.enrollForm.controls['major'].value);
    submitdata.append(
      'special_program',
      this.enrollForm.controls['special_program'].value || ''
    );
    submitdata.append('lrn', this.enrollForm.controls['lrn'].value);
    submitdata.append(
      'enrolling_for',
      this.enrollForm.controls['enrolling_for'].value
    );
    submitdata.append(
      'first_name',
      this.enrollForm.controls['first_name'].value
    );
    submitdata.append('last_name', this.enrollForm.controls['last_name'].value);
    submitdata.append(
      'middle_name',
      this.enrollForm.controls['middle_name'].value || ''
    );
    submitdata.append('suffix', this.enrollForm.controls['suffix'].value || '');
    submitdata.append('gender', this.enrollForm.controls['gender'].value);
    // submitdata.append(
    //   'civil_status',
    //   this.enrollForm.controls['civil_status'].value
    // );
    submitdata.append('age', this.enrollForm.controls['age'].value);
    submitdata.append('birthdate', this.enrollForm.controls['birthdate'].value);
    submitdata.append(
      'birth_place',
      this.enrollForm.controls['birth_place'].value
    );
    submitdata.append('email', this.enrollForm.controls['email'].value);
    submitdata.append(
      'mobile_number',
      this.enrollForm.controls['mobile_number'].value
    );
    submitdata.append(
      'm_tounge',
      this.enrollForm.controls['m_tounge'].value || ''
    );
    submitdata.append('ip', this.enrollForm.controls['ip'].value || '');
    submitdata.append(
      'pantawid',
      this.enrollForm.controls['pantawid'].value || ''
    );
    submitdata.append(
      'home_address',
      this.enrollForm.controls['home_address'].value
    );
    submitdata.append(
      'present_address',
      this.enrollForm.controls['present_address'].value
    );
    submitdata.append(
      'elementary',
      this.enrollForm.controls['elementary'].value
    );
    submitdata.append(
      'elementary_yr',
      this.enrollForm.controls['elementary_yr'].value
    );
    submitdata.append('jhs', this.enrollForm.controls['jhs'].value);
    submitdata.append('jhs_yr', this.enrollForm.controls['jhs_yr'].value);
    submitdata.append(
      'father_lastName',
      this.enrollForm.controls['father_lastName'].value || ''
    );
    submitdata.append(
      'father_firstName',
      this.enrollForm.controls['father_firstName'].value || ''
    );
    submitdata.append(
      'father_middleName',
      this.enrollForm.controls['father_middleName'].value || ''
    );
    submitdata.append(
      'father_number',
      this.enrollForm.controls['father_number'].value || ''
    );
    submitdata.append(
      'mother_lastName',
      this.enrollForm.controls['mother_lastName'].value || ''
    );
    submitdata.append(
      'mother_firstName',
      this.enrollForm.controls['mother_firstName'].value || ''
    );
    submitdata.append(
      'mother_middleName',
      this.enrollForm.controls['mother_middleName'].value || ''
    );
    submitdata.append(
      'mother_number',
      this.enrollForm.controls['mother_number'].value || ''
    );
    submitdata.append(
      'guardian_lastName',
      this.enrollForm.controls['guardian_lastName'].value || ''
    );
    submitdata.append(
      'guardian_firstName',
      this.enrollForm.controls['guardian_firstName'].value || ''
    );
    submitdata.append(
      'guardian_middleName',
      this.enrollForm.controls['guardian_middleName'].value || ''
    );
    submitdata.append(
      'guardian_number',
      this.enrollForm.controls['guardian_number'].value || ''
    );
    submitdata.append('signature', this.enrollForm.controls['signature'].value);

    // console.log(submitdata);
    this.EnrollmentSHSControllers.updatestudent(submitdata).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Successfully!',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        // this.router.navigate(['/student/information']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
}
