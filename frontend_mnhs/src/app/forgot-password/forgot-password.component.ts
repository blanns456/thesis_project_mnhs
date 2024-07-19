// src/app/components/forgot-password/forgot-password.component.ts

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiControllers } from 'src/app/controllers/controller.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ConfirmationService, MessageService],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {
  email!: string;
  otpcode!: string;
  otp: boolean = false;
  showForm3: boolean = false;
  checkotp: any;
  verify: any;
  resetpassform: FormGroup;
  pipe: any;

  loadingSendOtp: boolean = false;
  loadingVerifyOtp: boolean = false;
  loadingResetPass: boolean = false;

  constructor(
    private apiControllers: ApiControllers,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.pipe = new DatePipe('en-PH');
    this.resetpassform = new FormGroup({
      checkcode: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required]),
    });
  }

  sendotp() {
    this.loadingSendOtp = true;
    this.apiControllers.sendotp(this.email).subscribe({
      next: (res) => {
        this.checkotp = res;
        this.loadingSendOtp = false;
        if (this.checkotp['message'] == 'User found') {
          this.otp = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Code Sent',
            detail: 'Code has been sent to your Email',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email not Found',
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.loadingSendOtp = false;
      },
    });
  }

  verifyotp(event: Event) {
    this.loadingVerifyOtp = true;
    this.apiControllers.verifcode(this.otpcode).subscribe({
      next: (res) => {
        this.verify = res;
        this.loadingVerifyOtp = false;
        if (this.verify['message'] == 'Verified') {
          const d = Date();
          const myFormattedDate = this.pipe.transform(d, 'Y-MM-dd HH:mm:ss');
          if (this.verify[0]['expire'] >= myFormattedDate) {
            this.showForm3 = true;
          } else {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: 'OTP Code Expired. Resend?',
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',
              acceptIcon: 'none',
              rejectIcon: 'none',
              rejectButtonStyleClass: 'p-button-text',
              accept: () => {
                this.sendotp();
                this.otpcode = '';
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Code has resend to your email',
                });
              },
              reject: () => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Rejected',
                  detail: 'You have rejected',
                  life: 3000,
                });
                window.location.reload();
              },
            });
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Otp not exist',
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.loadingVerifyOtp = false;
      },
    });
  }

  resetpass() {
    this.loadingResetPass = true;
    this.resetpassform.get('checkcode')?.setValue(this.otpcode);
    this.apiControllers.resetpass(this.resetpassform.value).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password Reset Success',
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.loadingResetPass = false;
      },
    });
  }

  ngOnInit(): void {}
}
