import { Component, OnInit } from '@angular/core';

import { MmsService } from '../mms.service';
import { Member } from '../member';
import { ActivatedRoute, Params, Router } from '@angular/router'


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  member: Member;
  constructor(
    public mmsService: MmsService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getMember();
  }

  getMember() {
    const id = this.route.snapshot.params['id'];
    this.mmsService.getMember(id).subscribe(member => {
      this.member = member[0];
    })
  }
  goBack() {
    this.router.navigate(['/home'])
  }
}
