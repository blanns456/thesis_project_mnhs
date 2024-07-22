import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  loggedInUserData: any = {};
  studname: any;
  status: any;
  grade_level: any;
  profile: any;
  private httpSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getLoggedInUser();
  }

  private getLoggedInUser(): void {
    const auth_token = localStorage.getItem('token');

    if (!auth_token) {
      console.error('Authentication token not found.');
      return;
    }

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
        if (Array.isArray(res.data) && res.data.length > 0) {
          this.studname = res.data[0].lastname + ', ' + res.data[0].firstname;
          this.status = res.data[0].account_status;
          this.grade_level = res.data[0].grade_level;
          this.profile = 'http://127.0.0.1:8000/uploads/userimages/'+res.data[0].profile_image;
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
