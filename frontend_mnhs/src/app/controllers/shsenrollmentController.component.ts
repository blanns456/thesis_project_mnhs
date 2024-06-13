// import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EnrollmentSHSControllers {
  readonly Root_URL = 'http://127.0.0.1:8000/api/';
  token: any;

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  public createEnrollmentSHS(student: FormData) {
    return this.http.post(
      this.Root_URL + 'registershsEnroll',
      student,
      this.httpOptions
    );
  }

  public updatestudent(data: FormData) {
    console.log(data);
    return this.http.post(this.Root_URL + 'editstudents', data);
  }
}
