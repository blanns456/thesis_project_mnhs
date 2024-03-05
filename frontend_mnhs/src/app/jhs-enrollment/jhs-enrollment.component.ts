import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { ApiControllers } from '../controllers/controller.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var swal: any;

@Component({
  selector: 'app-jhs-enrollment',
  templateUrl: './jhs-enrollment.component.html',
  styleUrls: ['./jhs-enrollment.component.scss'],
})
export class JhsEnrollmentComponent implements OnInit {
  imageURL: string | undefined;
  studata: any;
  myForm: any;
  isYesSelected: boolean = false;
  isPantawidSelected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiController: ApiControllers,
    private router: Router
  ) {}
  // enrollForm!: FormGroup;
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  // formControlName = 'password';

  enrollForm: FormGroup = this.formBuilder.group({
    gradelevel: ['', [Validators.required]],
    program: ['', [Validators.required]],
    lrn: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    middlename: [''],
    suffix: [''],
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
    school_elem: ['', [Validators.required]],
    school_schoolyr: ['', [Validators.required]],
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
  ngOnInit() {}

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  calculateAge() {
    const birthdate = this.enrollForm?.get('birthdate')?.value;
    if (birthdate) {
      const birthdateDate = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthdateDate.getFullYear();
      const monthDiff = today.getMonth() - birthdateDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthdateDate.getDate())
      ) {
        age--;
      }
      this.enrollForm?.get('age')?.setValue(age);
    }
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

  savestudent() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
    this.enrollForm.patchValue({
      signature: this.signatureImg,
    });

    const submitdata = new FormData();

    submitdata.append(
      'imagefilename',
      this.enrollForm.controls['profile'].value
    );
    submitdata.append('lrn', this.enrollForm.controls['lrn'].value);
    submitdata.append('firstname', this.enrollForm.controls['firstname'].value);
    submitdata.append('lastname', this.enrollForm.controls['lastname'].value);
    submitdata.append(
      'middlename',
      this.enrollForm.controls['middlename'].value
    );
    submitdata.append('gender', this.enrollForm.controls['gender'].value);
    submitdata.append('suffix', this.enrollForm.controls['suffix'].value);
    submitdata.append('birthdate', this.enrollForm.controls['birthdate'].value);
    submitdata.append(
      'birth_place',
      this.enrollForm.controls['birth_place'].value
    );
    submitdata.append('age', this.enrollForm.controls['age'].value);
    submitdata.append('email', this.enrollForm.controls['email'].value);
    submitdata.append(
      'mobile_number',
      this.enrollForm.controls['mobile_number'].value
    );
    submitdata.append(
      'home_address',
      this.enrollForm.controls['home_address'].value
    );
    submitdata.append('ip', this.enrollForm.controls['ip'].value);
    submitdata.append('pantawid', this.enrollForm.controls['pantawid'].value);
    submitdata.append(
      'present_address',
      this.enrollForm.controls['present_address'].value
    );
    submitdata.append(
      'gradelevel',
      this.enrollForm.controls['gradelevel'].value
    );
    submitdata.append('program', this.enrollForm.controls['program'].value);
    submitdata.append(
      'school_elem',
      this.enrollForm.controls['school_elem'].value
    );
    submitdata.append(
      'school_schoolyr',
      this.enrollForm.controls['school_schoolyr'].value
    );
    submitdata.append('signature', this.enrollForm.controls['signature'].value);
    submitdata.append(
      'father_lastName',
      this.enrollForm.controls['father_lastName'].value
    );
    submitdata.append(
      'father_firstName',
      this.enrollForm.controls['father_firstName'].value
    );
    submitdata.append(
      'father_middleName',
      this.enrollForm.controls['father_middleName'].value
    );
    submitdata.append(
      'father_number',
      this.enrollForm.controls['father_number'].value
    );
    submitdata.append(
      'mother_lastName',
      this.enrollForm.controls['mother_lastName'].value
    );
    submitdata.append(
      'mother_firstName',
      this.enrollForm.controls['mother_firstName'].value
    );
    submitdata.append(
      'mother_middleName',
      this.enrollForm.controls['mother_middleName'].value
    );
    submitdata.append(
      'mother_number',
      this.enrollForm.controls['mother_number'].value
    );
    submitdata.append(
      'guardian_lastName',
      this.enrollForm.controls['guardian_lastName'].value
    );
    submitdata.append(
      'guardian_firstName',
      this.enrollForm.controls['guardian_firstName'].value
    );
    submitdata.append(
      'guardian_middleName',
      this.enrollForm.controls['guardian_middleName'].value
    );
    submitdata.append(
      'guardian_number',
      this.enrollForm.controls['guardian_number'].value
    );

    if (
      this.enrollForm.controls['profile'].invalid ||
      this.enrollForm.controls['firstname'].invalid ||
      this.enrollForm.controls['lastname'].invalid ||
      this.enrollForm.controls['gender'].invalid ||
      this.enrollForm.controls['lrn'].invalid ||
      this.enrollForm.controls['birthdate'].invalid ||
      this.enrollForm.controls['birth_place'].invalid ||
      this.enrollForm.controls['email'].invalid ||
      this.enrollForm.controls['mobile_number'].invalid ||
      this.enrollForm.controls['ip'].invalid ||
      this.enrollForm.controls['pantawid'].invalid ||
      this.enrollForm.controls['home_address'].invalid ||
      this.enrollForm.controls['present_address'].invalid ||
      this.enrollForm.controls['gradelevel'].invalid ||
      this.enrollForm.controls['program'].invalid ||
      this.enrollForm.controls['school_elem'].invalid ||
      this.enrollForm.controls['school_schoolyr'].invalid ||
      this.enrollForm.controls['signature'].invalid
    ) {
      // console.log(this.enrollForm.value);
      return;
    }
    this.apiController.createstudent(submitdata).subscribe((e) => {
      this.studata = e;
      if (this.studata['user'] == 'success') {
        this.router.navigate(['login']);
        Swal.fire({
          title: 'Success',
          text: 'Please Check Your Email',
          icon: 'success',
        });
      }else if (this.studata['message']) {
          Swal.fire(
            'ERROR',
            'Email Already Taken',
            'error'
        );
      }
      
    });
  }

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
}
