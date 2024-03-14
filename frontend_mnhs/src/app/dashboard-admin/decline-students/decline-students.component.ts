import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-decline-students',
  templateUrl: './decline-students.component.html',
  styleUrls: ['./decline-students.component.scss'],
})
export class DeclineStudentsComponent implements OnInit, AfterViewInit {
  private apiUrl = 'http://127.0.0.1:8000/api/declinestudent';

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
}
