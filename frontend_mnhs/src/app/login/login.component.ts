import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { data } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      Swal.fire({
        title: 'Error',
        text: 'Username and password are required.',
        icon: 'error',
      });
      return;
    }

    this.http
      .post<any>('http://127.0.0.1:8000/api/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          // console.log(response);
          if (response.role === 2) {
            this.router.navigate(['student/home']);
            Swal.fire({
              title: 'Hi',
              text: 'Welcome',
              icon: 'success',
            });
          } else if (response.role === 1) {
            this.router.navigate(['admin/home']);
            Swal.fire({
              title: 'Hi',
              text: 'Welcome Admin',
              icon: 'success',
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Invalid username or password.',
            icon: 'error',
          });
        }
      );
  }
}
