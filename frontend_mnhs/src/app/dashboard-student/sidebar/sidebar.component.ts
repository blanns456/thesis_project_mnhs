import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  loggedInUserData: any = {};
  data: any;
  studname: any;
  status: any;
  grade_level: any;
  profile: any;
  private httpSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private router: Router) {} 

  ngOnInit() {
    const auth_token = localStorage.getItem('token');

    if (!auth_token) {
      console.error('Authentication token not found.');
      return;
    }

    this.getLoggedInUser(auth_token);
  }

  private getLoggedInUser(auth_token: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });

    const apiUrl = 'http://127.0.0.1:8000/api/user';

    this.httpSubscription = this.http.get(apiUrl, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching user data:', error);
          throw error;
        })
      )
      .subscribe((res: any) => {
        console.log('API Response:', res);
        if (Array.isArray(res.data) && res.data.length > 0) {
          this.studname = res.data[0].lastname + ',' + res.data[0].firstname;
          this.status = res.data[0].account_status;
          this.grade_level = res.data[0].grade_level;
          this.profile = 'http://127.0.0.1:8000/uploads/userimages/'+res.data[0].profile_image;
          
        } else {
          console.error('Response data is not in the expected format or is empty.');
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInUserData = {};
    this.router.navigate(['login']); 
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }
}
