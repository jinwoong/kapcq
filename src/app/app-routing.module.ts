import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { AttendanceComponent } from './attendance/attendance.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ShowStatusComponent } from './show-status/show-status.component'

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'show/:id', component: ShowComponent},
  {path: 'attendance', component: AttendanceComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'show-status/:element/:value_date', component: ShowStatusComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
