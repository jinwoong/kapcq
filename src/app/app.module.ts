import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'
import { HotTableModule } from 'ng2-handsontable';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { AttendanceComponent } from './attendance/attendance.component'
import { DashboardComponent } from './dashboard/dashboard.component'

import { MmsService} from './mms.service';
import { ShowStatusComponent } from './show-status/show-status.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddComponent,
    EditComponent,
    ShowComponent,
    AttendanceComponent,
    DashboardComponent,
    ShowStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HotTableModule,
    ChartsModule
  ],
  providers: [MmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
