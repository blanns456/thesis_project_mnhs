import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiControllers } from 'src/app/controllers/controller.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { error } from 'jquery';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ConfirmationService, MessageService],
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

  constructor(
    private ApiControllers: ApiControllers,
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
    this.ApiControllers.sendotp(this.email).subscribe({
      next: (res) => {
        this.checkotp = res;
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
      },
    });
  }

  verifyotp(event: Event) {
    this.ApiControllers.verifcode(this.otpcode).subscribe({
      next: (res) => {
        this.verify = res;
        if (this.verify['message'] == 'Verified') {
          const d = Date();
          const myFormattedDate = this.pipe.transform(d, 'Y-MM-dd HH:mm:ss');
          // console.log(myFormattedDate);

          if (this.verify[0]['expire'] >= myFormattedDate) {
            this.showForm3 = true;
          } else {
            // console.log('expire na');
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
      },
    });
  }

  resetpass() {
    this.resetpassform.get('checkcode')?.setValue(this.otpcode);
    this.ApiControllers.resetpass(this.resetpassform.value).subscribe({
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
      },
    });
  }

  ngOnInit(): void {}
}
