import { Component, OnInit } from '@angular/core';
import { MmsService } from '../mms.service';
import { Member } from '../member';
import { Attendance } from '../attendance';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Status } from './status';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

    attendance = new Attendance();
    submitted = false;
    members: Member[];
    selectedMember =  new Member();
    selectedMembers = new Array<Member>();

    statuses = [
        new Status('present', 'Present' ),
        new Status('absent', 'Absent' ),
        new Status('unsure', 'Unsure' )
    ];

    constructor(
        public mmsService: MmsService,
        public route: ActivatedRoute,
        public router: Router
    ) { }

    ngOnInit() {
        this.initializeDefaultDate();
        this.getMembers();
    }
    getMembers() {
        this.mmsService.getMembers().subscribe(members => {
        this.members = members;
        })
    }
    public initializeDefaultDate() {
        this.mmsService.getLastSunday().do(result => this.getLastSunday(result)).subscribe(result => {
            if (result === 0) {
                console.log('No data available')
            }
        })
    }

    getLastSunday(obj) {
        (<HTMLInputElement>document.getElementById('attendanceDate')).value = obj[0].last_sunday;
    }

    public filterByTeamName() {
        // this.getMembers();
        // debugger;
        const team = (<HTMLInputElement>document.getElementById('team')).value
        if (team === 'All') {
            this.getMembers();
        }
        this.mmsService.getMemberByTeam(team).subscribe(result => {
            this.members = result;
        })
    }

    public test(obj) {
        console.log(obj);
    }
    onSubmit() {
        // debugger;
        this.attendance.value_date = (<HTMLInputElement>document.getElementById('attendanceDate')).value
        for (const member of this.members)
        {
            // debugger;
            if (member.status != null) {
                this.attendance.member_id = member._id
                this.attendance.status = member.status
                this.attendance.remarks = member.remarks
                this.mmsService.addAttendance(this.attendance).subscribe(() => this.goBack())
            }
        }
        this.submitted = true;
    }
    goBack() {
    this.router.navigate(['/dashboard'])
    }
}
