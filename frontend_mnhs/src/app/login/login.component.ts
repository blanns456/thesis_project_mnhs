import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    if (!this.username || !this.password) {
      Swal.fire({
        title: 'Error',
        text: 'Username and password are required.',
        icon: 'error',
      });
      return;
    }

    this.http.post<any>('http://127.0.0.1:8000/api/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          Swal.fire({
            title: 'Hi',
            text: 'Welcome',
            icon: 'success',
          });
          this.router.navigate(['student/home']);
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'Invalid username or password.',
            icon: 'error',
          });
        }
      );
  }
}
