import { Component, OnInit } from '@angular/core';

import { MmsService } from '../mms.service';
import { Member } from '../member';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  model = new Member();
  id = this.route.snapshot.params['id'];
  public isDataAvailable = false;
  constructor(
    public mmsService: MmsService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getMember();
  }
  getMember() {
    this.mmsService.getMember(this.id).do(result => this.checkBirthday(result[0])).subscribe(member => {
      this.model = member[0];
    })
  }
  updateMember() {
    this.mmsService.updateMember(this.model).subscribe(() => this.goBack())
  }
  goBack() {
    this.router.navigate(['/home'])
  }
  checkBirthday(obj) {
    if (obj.birthday.length > 0) {
      this.isDataAvailable = true;
    }
  }
}
