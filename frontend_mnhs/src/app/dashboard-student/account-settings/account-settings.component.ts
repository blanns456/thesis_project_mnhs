import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  username: any;
  oldPassword: any;
  newPassword: any;
  newPasswordConfirmation: any;
  errorMessages: { [key: string]: string } = {}; // Add this property

  constructor(private http: HttpClient, private messageService: MessageService,) { }

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
      'Authorization': `Bearer ${authToken}`
    });

    this.http.get('http://127.0.0.1:8000/api/user', { headers })
      .subscribe(
        (response: any) => {
          this.username = response.username; // Assuming the response contains the username
        },
        error => {
          console.error('Error fetching logged-in user:', error);
        }
      );
  }

    resetPassword() {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    const data = {
      username: this.username,
      old_password: this.oldPassword,
      new_password: this.newPassword,
      new_password_confirmation: this.newPasswordConfirmation
    };

    this.http.post('http://127.0.0.1:8000/api/reset/password', data, { headers })
      .subscribe(
        response => {
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
          // Handle success response
        },
        error => {
          console.error('Error resetting password:', error);
          this.handleErrors(error.error.errors); // Assuming the server returns validation errors in 'error.error.errors'
          // Handle error response
        }
      );
  }

  private handleErrors(errors: { [key: string]: string[] }) {
    this.errorMessages = {};
    for (const [key, value] of Object.entries(errors)) {
      this.errorMessages[key] = value.join(', ');
    }
  }
}