import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MmsService } from '../mms.service';
import { StatusCount } from './statusCount';
import { StatusRemarks } from './statusRemarks';
import { Team } from '../enums/team';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public status: string;
    public value_date: string;
    public remarks: StatusRemarks;
    public lastSunday: string;
    public total;
    public status_labels = ['absent', 'present', 'unsure']

    public pieChartLabels: string[] = ['absent', 'present', 'unsure'];
    public pieChartData: number[] = [0, 0, 0];
    public pieChartType = 'pie';
    public pieChartOptions: any = {
        responsive: true
    }
    // public isDataAvailable = false;

    public isLineDataAvailable = false;
    public lineChartData: number[] = [];
    public lineChartLabels: string[] = [];
    public lineChartOptions: any = {
        responsive: true,
        legend: {display: false},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    callback: label => `${label}%`
                }
            }]
        }
    };
    // public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(0,255,0,0.3)',
      borderColor: 'rgb(0,255,0)',
      pointBackgroundColor: 'rgb(63, 191, 63)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(63, 191, 63)'
    }];

    // bar chart
    public team: Team
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    public barChartLabels: string[] = ['문화팀', '선교전도팀', '예배팀', '회원관리팀', '친교팀', '새가족팀'];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData: any[] = [
        {data: [0, 0, 0, 0, 0, 0], label: 'Absent'},
        {data: [0, 0, 0, 0, 0, 0], label: 'Present'},
        {data: [0, 0, 0, 0, 0, 0], label: 'Unsure'},
    ];

    constructor(
        public mmsService: MmsService,
        public route: ActivatedRoute,
        public router: Router
    ) { }
    // events
    public pieChartClicked(e: any): void {
        this.value_date = (<HTMLInputElement>document.getElementById('attendanceDate')).value
        const selected_label = this.pieChartLabels[e.active[0]._index]
        this.router.navigate(['/show-status', selected_label, this.value_date]);
    }
    public pieChartHovered(e: any): void {
        console.log(e);
    }
    public lineChartClicked(e: any): void {
        console.log(e);
    }
    public lineChartHovered(e: any): void {
        console.log(e);
    }
    public barChartClicked(e: any): void {
        this.value_date = (<HTMLInputElement>document.getElementById('attendanceDate')).value;
        // debugger;
        // const team = Team[0];
        const team = Team[e.active[0]._model.label];
        // model.status = e.active[0]._model.datasetLabel;
        // model.status = model.status.toLowerCase();
        this.router.navigate(['/show-status', team, this.value_date]);
    }
    public barChartHovered(e: any): void {
        console.log(e);
    }

    ngOnInit() {
        this.initializeDefaultDate();
        this.getMemberTotal();
        this.getAttendanceRate();
    }

    public initializeDefaultDate() {
        this.mmsService.getLastSunday().do(result => this.getLastSunday(result)).subscribe(result => {
            if (result === 0) {
                console.log('No data available')
            }
        })
    }

    public getLastSunday(obj) {
        (<HTMLInputElement>document.getElementById('attendanceDate')).value = obj[0].last_sunday;
        this.getStatusCount();
    }

    public getStatusCount() {
        const value_date = (<HTMLInputElement>document.getElementById('attendanceDate')).value
        this.mmsService.getStatusCount(value_date).do(result => this.populateChart(result)).subscribe(result => {
            if (result === 0) {
                console.log('No result available')
            }
        })
        this.mmsService.getTeamStatus(value_date).do(result => this.populateBarChart(result)).subscribe(result => {
            if (result === 0) {
                console.log('No result available')
            }
        })
    }

    public getAttendanceRate() {
        // debugger;
        const period = (<HTMLInputElement>document.getElementById('period')).value
        const today = new Date()
        const this_month = today.getMonth();
        today.setMonth(this_month - +period)
        const test = today.toJSON().slice(0, 10)
        this.mmsService.getAttendanceRate(test).do(result => this.populateLineGraph(result)).subscribe(result => {
            if (result === 0) {
                console.log('No data available')
            }
        })
    }

    public getMemberTotal() {
        this.mmsService.getMemberTotal().subscribe(result => {
            this.total = result[0].total
        })
    }

    // populating Dashboard
    public populateChart(obj): void {
        const data = [0, 0, 0];

        for (let i = 0; i < obj.length; i++) {
            const status = obj[i].status;
            const count = obj[i].count;
            if (status === 'absent') {
                data[0] = count;
            } else if (status === 'present') {
                data[1] = count;
            } else {
                data[2] = count;
            }
        }

        let clone = JSON.parse(JSON.stringify(this.pieChartData));
        clone = data;
        this.pieChartData = clone;
    }

    public populateBarChart(obj): void {
        // debugger;
        const data1 = [0, 0, 0, 0, 0, 0];
        const data2 = [0, 0, 0, 0, 0, 0];
        const data3 = [0, 0, 0, 0, 0, 0];

        // const label = [];
        for (let i = 0; i < obj.length; i++) {
            const team = obj[i].team;
            const status = obj[i].status;
            const count = obj[i].count;
            const index = Team[team];
            if (status === 'absent') {
                data1[index] = count;
            } else if (status === 'present') {
                data2[index] = count;
            } else {
                data3[index] = count;
            }
        }
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data1;
        clone[1].data = data2;
        clone[2].data = data3;
        this.barChartData = clone;
    }

    public populateLineGraph(obj): void {
        // debugger;
        this.lineChartLabels.splice(0);
        let date: string;
        if (obj === 0) {
            alert('No data available');
        } else {
            // const lineLabels: Array<any> = [];
            const lineData: Array<any> = [];
            // const labelName = 'Present';
            for (let i = 0; i < obj.length; i++) {
                // value_date substring 'mm/dd' format
                date = obj[i].value_date.slice(5).replace('-', '/');
                this.lineChartLabels.push(date);
                lineData.push(+obj[i].attendance_rate);
            };
            // debugger;
            this.lineChartData = lineData;
            // this.lineChartLabels = lineLabels;
            this.isLineDataAvailable = true;
        }
    }
}
