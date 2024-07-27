import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school-year-settings',
  templateUrl: './school-year-settings.component.html',
  styleUrls: ['./school-year-settings.component.scss']
})
export class SchoolYearSettingsComponent implements OnInit {
  school_year_form: FormGroup;
  submitted = false;

  // Pagination variables
  schoolYears: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  searchSchoolStart: Date | null = null;
  searchSchoolEnd: Date | null = null;

  // Variable to store the currently edited school year's ID
  currentSchoolYearId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.school_year_form = this.formBuilder.group({
      school_year_duration: [null, Validators.required],
      school_year: [null, Validators.required],
      enrollment_duration: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSchoolYears();
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  submit_school_year(): void {
    this.submitted = true;

    if (this.school_year_form.valid) {
      const formData = this.school_year_form.value;
      const payload = {
        school_year1: formData.school_year[0],
        school_year2: formData.school_year[1],
        enrollment_start: formData.enrollment_duration[0],
        enrollment_end: formData.enrollment_duration[1],
        school_start: formData.school_year_duration[0],
        school_end: formData.school_year_duration[1]
      };

      const headers = this.createHeaders();

      if (this.currentSchoolYearId) {
        this.updateSchoolYear(this.currentSchoolYearId, payload, headers);
      } else {
        this.createSchoolYear(payload, headers);
      }
    } else {
      Swal.fire('Error', 'Form is invalid. Please check the fields.', 'error');
    }
  }

  createSchoolYear(payload: any, headers: HttpHeaders): void {
    this.http.post('http://127.0.0.1:8000/api/create-school-year', payload, { headers })
      .subscribe(
        response => {
          Swal.fire('Success', 'School year created successfully!', 'success');
          this.submitted = false;
          this.school_year_form.reset();
          this.loadSchoolYears(); // Reload the school years after successful creation
        },
        error => {
          Swal.fire('Error', `Error creating school year: ${error.error.message}`, 'error');
        }
      );
  }

  updateSchoolYear(id: number, payload: any, headers: HttpHeaders): void {
    this.http.put(`http://127.0.0.1:8000/api/update-school-year/${id}`, payload, { headers })
      .subscribe(
        response => {
          Swal.fire('Success', 'School year updated successfully!', 'success');
          this.submitted = false;
          this.school_year_form.reset();
          this.currentSchoolYearId = null;
          this.loadSchoolYears(); // Reload the school years after successful update
        },
        error => {
          Swal.fire('Error', `Error updating school year: ${error.error.message}`, 'error');
        }
      );
  }

  loadSchoolYears(): void {
    let url = `http://127.0.0.1:8000/api/school-years?page=${this.currentPage}`;
    if (this.searchTerm) {
      url += `&search=${this.searchTerm}`;
    }
    if (this.searchSchoolStart) {
      url += `&school_start=${this.formatDate(this.searchSchoolStart)}`;
    }
    if (this.searchSchoolEnd) {
      url += `&school_end=${this.formatDate(this.searchSchoolEnd)}`;
    }

    const headers = this.createHeaders();

    this.http.get(url, { headers }).subscribe((response: any) => {
      this.schoolYears = response.data;
      this.currentPage = response.current_page;
      this.totalPages = response.last_page;
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  search(): void {
    this.currentPage = 1;
    this.loadSchoolYears();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadSchoolYears();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadSchoolYears();
    }
  }

  editSchoolYear(year: any): void {
    this.currentSchoolYearId = year.id; // Store the ID of the school year being edited

    // Parse the school year string
    const schoolYearParts = year.school_year.replace('S.Y. ', '').split('-');
    const startYear = parseInt(schoolYearParts[0]);
    const endYear = parseInt(schoolYearParts[1]);

    this.school_year_form.patchValue({
      school_year_duration: [new Date(year.school_start), new Date(year.school_end)],
      school_year: [new Date(startYear, 0, 1), new Date(endYear, 0, 1)], // January 1st of each year
      enrollment_duration: [new Date(year.enrollment_start), new Date(year.enrollment_end)],
    });
  }

  deleteSchoolYear(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = this.createHeaders();

        this.http.delete(`http://127.0.0.1:8000/api/delete-school-year/${id}`, { headers })
          .subscribe(
            response => {
              Swal.fire('Deleted!', 'School year has been deleted.', 'success');
              this.loadSchoolYears(); // Reload the school years after successful deletion
            },
            error => {
              Swal.fire('Error', `Error deleting school year: ${error.error.message}`, 'error');
            }
          );
      }
    });
  }
}
