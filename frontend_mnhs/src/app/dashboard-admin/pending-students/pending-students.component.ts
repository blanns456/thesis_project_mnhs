import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pending-students',
  templateUrl: './pending-students.component.html',
  styleUrls: ['./pending-students.component.scss'],
})
export class PendingStudentsComponent implements OnInit {
  private apiUrl = 'http://127.0.0.1:8000/api/pendingstudent';
  students: any[] = [];
  loading: boolean = true;
  searchValue: string = '';

 @ViewChild('dt') dataTable: Table | undefined;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  loadData(): void {
    this.getData().subscribe(
      (data) => {
        this.students = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  approveStudent(studentId: number): void {
    console.log('Attempting to approve student with ID:', studentId);

    Swal.fire({
      title: 'Confirm Approval',
      text: 'Are you sure you want to approve this student?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post<any>(`http://127.0.0.1:8000/api/approvestud/${studentId}`, {})
          .subscribe({
            next: (response) => {
              console.log('Student approved successfully:', response);
              Swal.fire({
                title: 'Success',
                text: 'Student Approved Successfully',
                icon: 'success',
              });
              this.loadData();
            },
            error: (error) => {
              console.error('Error approving student:', error);
              console.error('Error details:', error.error);

              let errorMessage = 'Failed to approve student';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;
              }

              Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
              });
            },
            complete: () => {
              console.log('Approval process completed');
            }
          });
      } else {
        console.log('User cancelled the approval');
      }
    });
  }

  declineStudent(studentId: number): void {
    console.log('Attempting to decline student with ID:', studentId);

    Swal.fire({
      title: 'Confirm Decline',
      text: 'Are you sure you want to decline this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, decline',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post<any>(`http://127.0.0.1:8000/api/declinestud/${studentId}`, {})
          .subscribe({
            next: (response) => {
              console.log('Student declined successfully:', response);
              Swal.fire({
                title: 'Success',
                text: 'Student Declined Successfully',
                icon: 'success',
              });
              this.loadData();
            },
            error: (error) => {
              console.error('Error declining student:', error);
              console.error('Error details:', error.error);

              let errorMessage = 'Failed to decline student';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;
              }

              Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
              });
            },
            complete: () => {
              console.log('Decline process completed');
            }
          });
      } else {
        console.log('User cancelled the decline action');
      }
    });
  }

  filterGlobal(event: any, matchMode: string) {
    if (this.dataTable) {
      this.dataTable.filterGlobal(event.target.value, matchMode);
    } else {
      console.error('dataTable is not initialized');
    }
  }
}
