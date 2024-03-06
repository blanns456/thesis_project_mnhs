import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  student: any;
  data: any;
  studname: string | undefined;
  studentdata: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
