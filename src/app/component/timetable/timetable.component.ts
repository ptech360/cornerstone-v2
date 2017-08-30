import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../../providers/poll.service';

@Component({
 selector : "time-table",
 templateUrl : "./timetable.component.html",
 styleUrls : ["./timetable.component.css"]
})
export class TimetableComponent implements OnInit{
 private standards:any; 
 private standardLoader : any;
 private selectedStandards : any;
 private days : any[] = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 constructor(
 	public ps: PollService,
    public router:Router,
 ){}

 ngOnInit(){
 	this.getStandards();
 }

 onStandards(en : any){
 	console.log(en);
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