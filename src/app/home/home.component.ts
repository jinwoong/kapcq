import { Component, OnInit } from '@angular/core';
import { MmsService } from '../mms.service';
import { Member } from '../member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  members: Member;
  constructor(
    public mmsService: MmsService
  ) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.mmsService.getMembers().subscribe(members => {
      this.members = members;
    })
  }
  showWarning(id, name) {
    const res = confirm('Are you sure you want to delete this member? ' + name)
    if (res === true) {
      this.deleteMember(id)
    }
  }
  deleteMember(id) {
    this.mmsService.deleteMember(id).subscribe(() => {this.getMembers();
    });
  }
  addMember(info) {
    this.mmsService.addMember(info).subscribe(() => {this.getMembers();
    });
  }
}
