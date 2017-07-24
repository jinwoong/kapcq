import { Component, OnInit } from '@angular/core';

import { MmsService } from '../mms.service';
import { Member } from '../member';
import { ActivatedRoute, Params, Router } from '@angular/router' 

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  model = new Member();
  constructor(
    public mmsService: MmsService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
  }

  get diagnostic() { return JSON.stringify(this.model); }

  addMember() {
    this.mmsService.addMember(this.model).subscribe(() => this.goBack())
  }
  goBack() {
    this.router.navigate(['/home'])
  }
}
