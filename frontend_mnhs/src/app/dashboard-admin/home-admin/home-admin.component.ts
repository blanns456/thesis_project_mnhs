import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StudentEnrollmentService } from 'src/app/student-enrollment.service';

Chart.register(...registerables);

interface EnrollmentData {
  school_year: string;
  student_count: number;
}

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  title = 'Chart';
  chart: Chart | null = null;

  constructor(private enrollmentService: StudentEnrollmentService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.enrollmentService.getEnrollmentData().subscribe(
      (data: EnrollmentData[]) => {
        console.log('Received data:', data);
        this.createChart(data);
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }

  createChart(data: EnrollmentData[]) {
    const labels = data.map(item => item.school_year);
    const values = data.map(item => item.student_count);

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "No. of Student's Enrolled",
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
