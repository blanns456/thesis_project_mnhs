import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-students',
  templateUrl: './pending-students.component.html',
  styleUrls: ['./pending-students.component.scss'],
})
export class PendingStudentsComponent implements OnInit, AfterViewInit {
  private apiUrl = 'http://127.0.0.1:8000/api/pendingstudent';

  students: any;
  data: any;

  @ViewChild('dataTable', { static: false }) table: any;
  dataTable: any;

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  loadData(): void {
    this.getData().subscribe((data) => {
      this.students = data;
      console.log(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    new DataTable(this.dataTable);
  }

  ngOnInit(): void {
    this.loadData();
  }

  approveStudent(studentId: number): void {
    this.http
      .post<any>(`http://127.0.0.1:8000/api/approvestud/${studentId}`, {})
      .subscribe(
        (response) => {
          console.log('Student approved successfully:', response);
          Swal.fire({
            title: 'Success',
            text: 'Approved Successfully',
            icon: 'success',
          });
          window.location.reload();
        },
        (error) => {
          console.error('Error approving student:', error);
          Swal.fire({
            title: 'ERROR',
            text: 'Failed to approved',
            icon: 'error',
          });
          window.location.reload();
        }
      );
  }

  declineStudent(studentId: number): void {
    this.http
      .post<any>(`http://127.0.0.1:8000/api/declinestud/${studentId}`, {})
      .subscribe(
        (response) => {
          console.log('Student approved successfully:', response);
          Swal.fire({
            title: 'Success',
            text: 'Declined Successfully',
            icon: 'success',
          });
          window.location.reload();
        },
        (error) => {
          console.error('Error approving student:', error);
          Swal.fire({
            title: 'ERROR',
            text: 'Failed to decline',
            icon: 'error',
          });
          window.location.reload();
        }
      );
  }
}
