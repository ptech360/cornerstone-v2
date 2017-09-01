import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeTableService } from '../../providers/timetable.service';
import { FormsModule,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
 selector : "time-table",
 templateUrl : "./timetable.component.html",
 styleUrls : ["./timetable.component.css"]
})
export class TimetableComponent implements OnInit{
 private standards:any; 
 private standardLoader : any;
 private selectedStandards : any = 1;
 private timetable : any;
 private days : any[] = [] ;
 private daysdata : any[] = [];
 
 constructor(
 	public ps: TimeTableService,
    public router:Router,
 ){}

 ngOnInit(){
 	this.getStandards();
   this.getTimeTable(this.selectedStandards);
 }

 onStandards(en : any){
 	console.log(en);
 }

 getTimeTable(selectedstandard:any){
   this.days = [];
   this.daysdata = [];
   this.ps.gettimeTable( selectedstandard ).subscribe(res => {
      this.timetable = res;
      Object.keys(res).forEach( key => {
     this.daysdata.push(res[key]); 
     console.log(res[key]);//value    
     this.days.push(key); //key
      });
      console.log(this.timetable);
    },
      err => {
        this.router.navigate(['/error']);
      })
 }

 getStandards() {
    this.standardLoader=true;
    this.ps.getStandards().subscribe(res => {
      this.standardLoader=false;
      this.standards = res;
    },
      err => {
        this.router.navigate(['/error']);
      })
  }
}