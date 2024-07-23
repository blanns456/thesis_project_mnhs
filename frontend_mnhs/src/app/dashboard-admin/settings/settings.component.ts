import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  username: any;
  oldPassword: any;
  newPassword: any;
  newPasswordConfirmation: any;
  errorMessages: { [key: string]: string } = {};

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      console.error('Authentication token not found.');
      return;
    }
    this.getLoggedInUser(authToken);
  }

  private getLoggedInUser(authToken: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    this.http.get('http://127.0.0.1:8000/api/user', { headers }).subscribe(
      (response: any) => {
        this.username = response.username; // Assuming the response contains the username
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

  resetPassword() {
    this.errorMessages = {}; // Initialize errorMessages here

    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );
    const data = {
      username: this.username,
      old_password: this.oldPassword,
      new_password: this.newPassword,
      new_password_confirmation: this.newPasswordConfirmation,
    };

    this.http
      .post('http://127.0.0.1:8000/api/reset/password', data, { headers })
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password reset successful!',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log('Password reset successful!');
          this.errorMessages = {}; // Clear the error messages
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error resetting password:', error);
          if (error.error && error.error.errors) {
            this.handleErrors(error.error.errors); // Assuming the server returns validation errors in 'error.error.errors'
          } else if (
            error.error &&
            error.error.error === 'Incorrect old password'
          ) {
            this.errorMessages['old_password'] = 'Incorrect old password'; // Handle the specific error message
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error occurred while resetting the password. Please try again.',
            });
          }
        },
      });
  }

  private handleErrors(errors: { [key: string]: string[] }) {
    this.errorMessages = {};
    for (const [key, value] of Object.entries(errors)) {
      this.errorMessages[key] = value.join(', ');
    }
  }
}
