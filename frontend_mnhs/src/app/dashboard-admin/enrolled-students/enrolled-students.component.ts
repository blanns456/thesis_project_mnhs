import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrolled-students',
  templateUrl: './enrolled-students.component.html',
  styleUrls: ['./enrolled-students.component.scss'],
})
export class EnrolledStudentsComponent implements OnInit, AfterViewInit {
  private apiUrl = 'http://127.0.0.1:8000/api/enrollstudent';

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

  retrieve(
    studentId: string,
    semester: string,
    firstname: string,
    lastname: string,
    middlename: string,
    track: string,
    strand: string,
    LRN: string,
    suffix: string,
    ip: string,
    pantawid: string,
    gender: string,
    civil_status: string,
    birthdate: string,
    birth_place: string,
    email: string,
    mobile_number: string,
    citizenship: string,
    religion: string,
    home_address: string,
    present_address: string,
    grade_level: string,
    special_program: string,
    school_elem: string,
    elem_schoolyr: string,
    school_jhs: string,
    jhs_schoolyr: string,
    profile_image: string,
    school_id: string,
    lastgrade_completed: string,
    last_school: string,
    last_schoolyr: string
  ): void {
    // alert(studentId);

    $('#studid').html(studentId);
    $('#fullname').html(firstname + ' ' + lastname);
    $('#semester').val(semester);
    $('#lrn').val(LRN);
    $('#track').val(track);
    $('#strand').val(strand);
    $('#first_name').val(firstname);
    $('#last_name').val(lastname);
    $('#middle_name').val(middlename);
    $('#suffix').val(suffix);
    $('#yesIP').val(ip);
    $('#pantawidId').val(pantawid);
    $('#gender').val(gender);
    $('#civil_status').val(civil_status);
    $('#b_date').val(birthdate);
    $('#b_place').val(birth_place);
    $('#email').val(email);
    $('#number').val(mobile_number);
    $('#citizenship').val(citizenship);
    $('#religion').val(religion);
    $('#home_address').val(home_address);
    $('#present_address').val(present_address);
    $('#enrolling_for').val(grade_level);
    $('#major').val(special_program);
    $('#elementary').val(school_elem);
    $('#elementary_yr').val(elem_schoolyr);
    $('#jhs').val(school_jhs);
    $('#jhs_yr').val(jhs_schoolyr);
    $('#schoolID').val(school_id);
    $('#lastgradecompl').val(lastgrade_completed);
    $('#lastschool').val(last_school);
    $('#lastschool_yr').val(last_schoolyr);
    $('#imgprev').attr(
      'src',
      'http://127.0.0.1:8000/uploads/userimages/' + profile_image
    );
  }
}
