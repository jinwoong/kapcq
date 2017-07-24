import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MmsService {
  checkMe: any;
  header = 'https://murmuring-bayou-72760.herokuapp.com/'
  constructor(private _http: Http) { }
  getMembers() {
    return this._http.get(this.header + 'select.php')
      .map(res => {
        this.checkMe = res;
        if (this.checkMe._body !== '0') {
          return res.json()
        }
      });
  }
  addMember(info) {
    return this._http.post(this.header + 'insert.php', info).map(() => '');
  }
  getMember(id) {
    return this._http.post(this.header + 'selectone.php/', {'id': id}).map(res => res.json());
  }
  deleteMember(id) {
  return this._http.post(this.header + 'delete.php/', {'id': id}).map(() => this.getMembers());
  }
  updateMember(info) {
  return this._http.post(this.header + 'update.php/', info).map(() => '');
  }
  addAttendance(info) {
    return this._http.post(this.header + 'insertAttendance.php', info).map(() => '');
  }
  // getAttendance(value_date) {
  //   return this._http.post(this.header + 'selectAttendance.php/', {'value_date': value_date}).map(res => res.json());
  // }
  getStatusCount(value_date) {
    return this._http.post(this.header + 'countStatus.php/', {'value_date': value_date}).map(res => res.json());
  }
  getStatusRemarks(status, value_date) {
    return this._http.post(this.header + 'selectStatusRemarks.php/',
    {'status': status, 'value_date': value_date}).map(res => res.json());
  }
  getTeamStatusRemark(team, value_date) {
    return this._http.post(this.header + 'selectTeamStatus.php/',
    {'team': team, 'value_date': value_date}).map(res => res.json());
  }
  getAttendanceRate(value_date) {
    return this._http.post(this.header + 'selectAttendanceRate.php/', {'value_date': value_date}).map(res => res.json());
  }
  getLastSunday() {
    return this._http.get(this.header + 'selectLastSunday.php/').map(res => {
      this.checkMe = res;
      if (this.checkMe._body !== '0') {
        return res.json()
      }
    });
  }
  getMemberByTeam(team) {
    return this._http.post(this.header + 'selectTeam.php/', {'team': team}).map(res => res.json());
  }
  getMemberTotal() {
    return this._http.get(this.header + 'countTotal.php/').map(res => res.json());
  }
  getTeamStatus(value_date) {
    return this._http.post(this.header + 'countTeamStatus.php/', {'value_date': value_date}).map(res => res.json());
  }
}

