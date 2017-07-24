import { Component, OnInit } from '@angular/core';
import { MmsService } from '../mms.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { StatusRemarks } from './statusRemarks';
import { Team } from '../enums/team';

@Component({
  selector: 'app-show-status',
  templateUrl: './show-status.component.html',
  styleUrls: ['./show-status.component.css']
})
export class ShowStatusComponent implements OnInit {
  remarks: StatusRemarks;
  constructor(
    public mmsService: MmsService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getTeamStatusRemarks();
    this.getStatusRemarks();
  }
  public getStatusRemarks() {
    // debugger;
    const status = this.route.snapshot.params['element'];
    if (status != null) {
      const value_date = this.route.snapshot.params['value_date']
      this.mmsService.getStatusRemarks(status, value_date).subscribe(result => {
      this.remarks = result;
    })
    }
  }
  public getTeamStatusRemarks() {
    // debugger;
    const team = Team[this.route.snapshot.params['element']];
    if (team != null) {
      const value_date = this.route.snapshot.params['value_date'];
      this.mmsService.getTeamStatusRemark(team, value_date).subscribe(result => {
      this.remarks = result;
    })
    }
  }
  goBack() {
    this.router.navigate(['/dashboard'])
  }
}
