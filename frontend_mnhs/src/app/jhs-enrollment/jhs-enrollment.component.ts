import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { ApiControllers } from '../controllers/controller.component';
import { Router } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-jhs-enrollment',
  templateUrl: './jhs-enrollment.component.html',
  styleUrls: ['./jhs-enrollment.component.scss'],
})
export class JhsEnrollmentComponent implements OnInit {
  imageURL: string | undefined;
  studata: any;

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
    profile: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    middlename: [''],
    gender: ['', [Validators.required]],
    suffix: [''],
    civil_status: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    birth_place: ['', [Validators.required]],
    email: ['', [Validators.required]],
    mobile_number: ['', [Validators.required]],
    citizenship: ['', [Validators.required]],
    religion: ['', [Validators.required]],
    home_address: ['', [Validators.required]],
    present_address: ['', [Validators.required]],
    gradelevel: ['', [Validators.required]],
    program: ['', [Validators.required]],
    school_elem: ['', [Validators.required]],
    school_schoolyr: ['', [Validators.required]],
    mother_name: ['', [Validators.required]],
    father_name: ['', [Validators.required]],
    mother_occupation: ['', [Validators.required]],
    father_occupation: ['', [Validators.required]],
    mother_contactnumber: ['', [Validators.required]],
    father_contactnumber: ['', [Validators.required]],
    signature: ['', [Validators.required]],
  });
  ngOnInit() {}

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
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
    submitdata.append('firstname', this.enrollForm.controls['firstname'].value);
    submitdata.append('lastname', this.enrollForm.controls['lastname'].value);
    submitdata.append(
      'middlename',
      this.enrollForm.controls['middlename'].value
    );
    submitdata.append('gender', this.enrollForm.controls['gender'].value);
    submitdata.append('suffix', this.enrollForm.controls['suffix'].value);
    submitdata.append(
      'civil_status',
      this.enrollForm.controls['civil_status'].value
    );
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
      'citizenship',
      this.enrollForm.controls['citizenship'].value
    );
    submitdata.append('religion', this.enrollForm.controls['religion'].value);
    submitdata.append(
      'home_address',
      this.enrollForm.controls['home_address'].value
    );
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
    submitdata.append(
      'mother_name',
      this.enrollForm.controls['mother_name'].value
    );
    submitdata.append(
      'father_name',
      this.enrollForm.controls['father_name'].value
    );
    submitdata.append(
      'mother_occupation',
      this.enrollForm.controls['mother_occupation'].value
    );
    submitdata.append(
      'father_occupation',
      this.enrollForm.controls['father_occupation'].value
    );
    submitdata.append(
      'mother_contactnumber',
      this.enrollForm.controls['mother_contactnumber'].value
    );
    submitdata.append(
      'father_contactnumber',
      this.enrollForm.controls['father_contactnumber'].value
    );
    submitdata.append('signature', this.enrollForm.controls['signature'].value);

    if (
      this.enrollForm.controls['profile'].invalid ||
      this.enrollForm.controls['firstname'].invalid ||
      this.enrollForm.controls['lastname'].invalid ||
      this.enrollForm.controls['gender'].invalid ||
      this.enrollForm.controls['civil_status'].invalid ||
      this.enrollForm.controls['birthdate'].invalid ||
      this.enrollForm.controls['birth_place'].invalid ||
      this.enrollForm.controls['email'].invalid ||
      this.enrollForm.controls['mobile_number'].invalid ||
      this.enrollForm.controls['citizenship'].invalid ||
      this.enrollForm.controls['religion'].invalid ||
      this.enrollForm.controls['home_address'].invalid ||
      this.enrollForm.controls['present_address'].invalid ||
      this.enrollForm.controls['gradelevel'].invalid ||
      this.enrollForm.controls['program'].invalid ||
      this.enrollForm.controls['school_elem'].invalid ||
      this.enrollForm.controls['school_schoolyr'].invalid ||
      this.enrollForm.controls['mother_name'].invalid ||
      this.enrollForm.controls['father_name'].invalid ||
      this.enrollForm.controls['mother_occupation'].invalid ||
      this.enrollForm.controls['father_occupation'].invalid ||
      this.enrollForm.controls['mother_contactnumber'].invalid ||
      this.enrollForm.controls['father_contactnumber'].invalid ||
      this.enrollForm.controls['signature'].invalid
    ) {
      console.log('hello');
      return;
    }
    this.apiController.createstudent(submitdata).subscribe((e) => {
      this.studata = e;
      if (this.studata['user'] == 'success') {
        swal({
          title: 'Success',
          type: 'success',
          confirmButtonText: 'Okay',
        }).then(() => {
          this.router.navigate(['login']);
        });

        console.log(e);
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
