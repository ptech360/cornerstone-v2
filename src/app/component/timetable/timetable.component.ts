import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeTableService } from '../../providers/timetable.service';
import { FormsModule,FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;
@Component({
 selector : "time-table",
 templateUrl : "./timetable.component.html",
 styleUrls : ["./timetable.component.css"]
})
export class TimetableComponent implements OnInit{
 private standards:any; 
 private standardLoader : any;
 private selectedStandards : any = 1 ;
 private timetable : any;
 private days : any[] = [] ;
 private daysdata : any[] = [];
 private endtime : string;
 private starttime : string;  
 private day : string ;
 private subjects : any[];
 private selectedSubject : any = 1 ;
 private timetableid : any;
 private showsubjectlist : boolean = true;
 private showsubjectname : boolean = false;
 private subjectName : string;
 constructor(
 	public ps: TimeTableService,
    public router:Router,
 ){ }

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

  getModal(selectedstandard : any , x : any, i : any){
    if(x.subjectName!=null){
      this.showsubjectlist = false;
      this.showsubjectname = true;
    }
    else{
     this.showsubjectname = false;
     this.showsubjectlist = true; 
    }
    this.subjectName = x.subjectName;
    this.starttime = x.startTime;
    this.endtime = x.endTime;
    this.timetableid = x.id;
    this.day = this.days[i];
    console.log("id is : "+this.timetableid);
     $('#editSubject').modal('show');
     this.getSubject(selectedstandard); 
  }

  showlist(){
    this.showsubjectlist = true;
  }
 getSubject(selectedstandard:any){
   this.ps.getSubject(selectedstandard).subscribe(res => {
     this.subjects = res;
   },
     err => {
       this.router.navigate(['/error']);
     })
 }

 onSubmit(){
   this.ps.onSubmit(this.timetableid,this.selectedSubject).subscribe(res => {
     console.log(res);
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