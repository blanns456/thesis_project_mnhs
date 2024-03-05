import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  loggedInUserData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const auth_token = localStorage.getItem('token'); 

    if (!auth_token) {
      console.error('Authentication token not found.');
      return;
    }

    this.getLoggedInUser(auth_token).subscribe(
      data => {
        console.log('User Data:', data);
        this.loggedInUserData = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  getLoggedInUser(auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const apiUrl = 'http://127.0.0.1:8000/api/user';
    return this.http.get(apiUrl, { headers: headers });
  }
}
