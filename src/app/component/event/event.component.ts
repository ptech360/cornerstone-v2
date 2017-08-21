import { Component, Input, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../../providers/event.service';
import {CommonService} from '../../providers/common.service';
import * as moment_ from 'moment';
import { Http } from '@angular/http';
import 'fullcalendar';
// import * as _ from 'jquery';
declare let $: any;

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {
  public event:FormGroup;
  public currentMonth: any;
  public newEvents: any;
  public calInstance:any;
  public thisdate:any;
  public eventsInfo:any;
  public eventId:any;
  public pageNo:any=1;
  public eventMonth:any;
  public emptyEvent:boolean; 
  public planner:any; 
  public standard:any;
  public editEvent:FormGroup;
  public start:any;
  public end:any;
  public stdIds:any[]=[];
  public selectedEvent:any;
  public message:any;
  public loader:boolean=true;
  public empId:any;
  public id:any;
  public disable:any;
public standardId:any[]=[];
  
  // public startT:any;
  // public endT:any;
  constructor(
     
    private eventService: EventService,
    private http: Http,
    private element:ElementRef,
    private cs:CommonService,
  ) {
    this.getPlanner();
    this.getStandardId();
     
  }

    ngOnInit() {   
    this.id = localStorage.getItem("id");
    this.event=this.initForm(); 
  
  }

  ngAfterViewInit(){
      $('#calendar').fullCalendar('renderEvents', this.calendarOptions.events, true); 
  }
    
     public calendarOptions:any={
        fixedWeekCount: false,
        editable: true,
        eventLimit: true,
        firstDay: 1,
        selectable: true,
        selectHeader: true,
        timeFormat: ' ',
        header: {
          right: 'today,month,listMonth, prev,next'
        },
        
        events: [
          ],

        eventClick:(event:any, jsEvent:any, view:any)=> {
          this.selectedEvent=event;   
          this.empId=event.employeeId; 
          if(this.empId==this.id){
            this.disable=true;
          }
          this.editEvent=this.editForm();
          this.event=this.initForm(); 
          this.getEventById(event.id);
          $('#fullCalModal').modal();         
        },

        select: (start:any, end:any)=> {
        if(start.isBefore(moment_().subtract(1, "days"))) {
          $('#calendar').fullCalendar('unselect');
          $('#modal-unselect').modal();
          return false;
          }
        else{
          this.event.reset;
          this.start=moment_(start).format('YYYY-MM-DD');
          // var tomorrow = new Date(this.start);
          // tomorrow.setDate(tomorrow.getDate() + 1);
          this.end=moment_(start).format('YYYY-MM-DD');  
          this.event=this.initForm();            
          $('#fullCalView').modal();    
        }
        },
        
        dayRender:function(date:any,cell:any){
          if(date.isBefore(moment_().subtract(1, "days")))
          cell.css("background-color","#fbfdff");
          cell.css("color","grey");
          
        },
      
       viewRender: (view:any, element:any)=> {
          var b = $('#calendar').fullCalendar('getDate');
          var check = moment_(b, 'YYYY/MM/DD');
          var month = check.format('MM');
          var year  = check.format('YYYY');       
          this.eventMonth= year + "-" + month;
          this.getEvents();
      },
     }

    public initForm(){       
     return new FormGroup({
      title:new FormControl('', [Validators.required]),
      plannerTypeId:new FormControl([], [Validators.required]),
      startDate:new FormControl(this.start,[Validators.required]),
      endDate:new FormControl(this.end,[Validators.required]),
      location:new FormControl(''),
      description:new FormControl(''),
     })

  }
    public editForm(){
      return new FormGroup({
      title:new FormControl(this.selectedEvent.title),        
      startDate:new FormControl(this.selectedEvent.startDate),
      endDate:new FormControl(this.selectedEvent.endDate),
      startTime:new FormControl(this.selectedEvent.startTime),
      endTime:new FormControl(this.selectedEvent.endTime),
      location:new FormControl(this.selectedEvent.location),
      description:new FormControl(this.selectedEvent.description),
    })
    }



    public selectPlannerType(type:any){
    if(type==2){
      this.event.addControl("standardIds", new FormControl('', [Validators.required]));
    }
    else if(type!=2){
      this.event.removeControl("standardIds");
      // this.standard = [];
    }
    if(type==3 ||type==4){
      this.event.removeControl("startTime");            
      this.event.removeControl("endTime");      
    }
    else if((type!=3) ||(type!=4)){
      this.event.addControl("startTime", new FormControl('', [Validators.required]));
      this.event.addControl("endTime", new FormControl('', [Validators.required])); 
    }

  }
  public startTime:any;
  public endTime:any;

public startT(e:any){
  this.startTime=e;
  this.event.controls['startTime'].patchValue(e);
  if((this.event.controls['startDate'].value)==(this.event.controls['endDate'].value)){
  if(this.endTime<this.startTime){
      this.message="Please choose start time less than end time";
      $('#modal-success').modal('show'); 
  this.event.controls['startTime'].patchValue("");  
      this.event.controls['endTime'].patchValue("");
      $("input[type=time]").val("");
      this.startTime=null;
      this.endTime=null;
  }
  }

}

public endT(e:any){
  this.endTime=e;
  this.event.controls['endTime'].patchValue(e);  
  if((this.event.controls['startDate'].value)==(this.event.controls['endDate'].value)){  
    if(this.endTime<this.startTime){
      this.message="Please choose end time greater than start time";
      $('#modal-success').modal('show'); 
      // this.event.controls['startTime'].patchValue("")    
      $("input[type=time]").val("");
         this.event.controls['startTime'].patchValue("");  
      this.event.controls['endTime'].patchValue("");     
      this.startTime=null;
      this.endTime=null;
    } 
  }
 
// this.endTime=null;
}

    public getEvents(){  
      this.eventService.GetEvents(this.eventMonth).subscribe((res) => {  
        if(res.status===204){
          this.emptyEvent=true;
          this.loader=false;
        }
        else{ 
          this.loader=false;
      this.newEvents=res;
      $('#calendar').fullCalendar('removeEvents');
      $('#calendar').fullCalendar('addEventSource', this.newEvents);
        }
      
    }, (err) => {
    });
  }
// public startTi:any;
// public endTi:any;
  public getEventById(id:any){
    this.eventService.GetEventById(id).subscribe((res)=>{
      this.eventsInfo=res;
      $('#fullCalModal').modal('show');         
    this.startTime = moment_(this.eventsInfo.start).format('HH-MM-SS-A');
     this.endTime = moment_(this.eventsInfo.end).format('HH-MM-SS-A');
    })

  }

  public getPlanner(){
    this.eventService.GetPlanner().subscribe((res)=>{
      this.planner=res;
      this.loader=false;
    },(err)=>{
    })
  }
  
  public getStandardId() {
    this.eventService.getStandards().subscribe((res) => {
      this.standard = res;
    }, (err) => {
    });
  }

  public postEvent(){
    this.eventService.postEvent(this.event.value).subscribe((res)=>{
      this.message="You have successfully added an event";
      $('#modal-success').modal();  
      // $('#message').html(this.eventsInfo.eventTitle);       
      this.getEvents();
    },(err)=>{
    })
  }

  public deleteEvent(){
    this.eventService.deleteEvent(this.eventsInfo.id).subscribe((res)=>{
      this.message="You have successfully deleted the event";
      $('#modal-success').modal('show');             
      this.getEvents();
    },(err)=>{
    })
    
  }

  public updateEvent(){
    this.eventService.updateEvent(this.eventsInfo.id,this.editEvent.value).subscribe((res)=>{
      this.newEvents=res;
      this.message="You have successfully updated the event";
      $('#modal-success').modal('show');         
      this.getEvents();
    },(err)=>{});
  }


public selectStandards(a:any,e:any){
    if(e==true){
      this.stdIds.push(a.id);
    }
    else if(e==false){
      this.stdIds.forEach((element:any, index:any)=>{
         if (element==a.id){
          this.stdIds.splice(index,1);
        }
      })
    }
    this.event.controls['standardIds'].patchValue(this.stdIds);
  }

  public currentDate:any;

  public onDueDate(e:any){
    this.currentDate=e.target.value;
    if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      this.message="Please choose an upcoming date from the calendar";
      $('#modal-success').modal('show');               
      this.event.controls['startDate'].patchValue(this.start);
      this.event.controls['endDate'].patchValue(this.start);
    }
      
    if(new Date(e.target.value)> new Date(this.event.controls['endDate'].value)){
      this.message="Please choose date before end date from the calendar";
      $('#modal-success').modal('show');               
      this.event.controls['startDate'].patchValue(this.start);
    }
    this.startT(this.startTime);
    this.endT(this.endTime);

  }

  public checkDate(e:any){
    if(new Date(e.target.value)<new Date(this.event.controls['startDate'].value))
      {
      this.message="Please choose a date after start date";
      $('#modal-success').modal('show'); 
      this.event.controls['endDate'].patchValue(this.start);
      }
    this.startT(this.startTime);
    this.endT(this.endTime);
  }



public onStartDate(e:any){
    if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      this.message="Please choose an upcoming date from the calendar";
      $('#modal-success').modal('show'); 
      this.editEvent.controls['startDate'].patchValue(this.selectedEvent.startDate);
      this.editEvent.controls['endDate'].patchValue(this.selectedEvent.startDate);
    }
    if(new Date(e.target.value)> new Date(this.editEvent.controls['endDate'].value)){
      this.message="Please choose date before end date from the calendar";
      $('#modal-success').modal('show');               
      this.editEvent.controls['startDate'].patchValue(this.selectedEvent.startDate);
    this.checkStart(this.startTime);
    this.checkEnd(this.endTime);  
    }
  }

  public check(e:any){
    if(new Date(e.target.value)<new Date(this.editEvent.controls['startDate'].value))
      {
      this.message="Please choose a date after start date";
      $('#modal-success').modal('show'); 
      this.editEvent.controls['endDate'].patchValue(this.selectedEvent.startDate);
      }
    this.checkStart(this.startTime);
    this.checkEnd(this.endTime);
  }

  public checkStart(e:any){
    
    this.startTime=e;

  if((this.editEvent.controls['startDate'].value)==(this.editEvent.controls['endDate'].value)){
  if(this.endTime<this.startTime){
      this.message="Please choose start time less than end time";
      $('#modal-success').modal('show'); 
      this.editEvent.controls['startTime'].patchValue("");  
      this.editEvent.controls['endTime'].patchValue("");
      $("input[type=time]").val("");
      this.startTime=null;
      this.endTime=null;
  }
  }

  }

  public checkEnd(e:any){
  this.endTime=e;
    // this.editEvent.controls['endTime'].patchValue(e);

  if((this.editEvent.controls['startDate'].value)==(this.editEvent.controls['endDate'].value)){  
    if(this.endTime<this.startTime){
      this.message="Please choose end time greater than start time";
      $('#modal-success').modal('show'); 
      this.event.controls['startTime'].patchValue("")    
      this.editEvent.controls['startTime'].patchValue("");  
      this.editEvent.controls['endTime'].patchValue("");   
      $("input[type=time]").val("");
        this.startTime=null;
        this.endTime=null;
    } 
  }

  }
public resetForm(){
      this.editEvent.patchValue({ "title": this.selectedEvent.title });
      this.editEvent.patchValue({ "startdate": this.selectedEvent.startDate });
      this.editEvent.patchValue({ "endDate": this.selectedEvent.endDate });
      this.editEvent.patchValue({ "startTime": this.selectedEvent.startTime });
      this.editEvent.patchValue({ "endTime": this.selectedEvent.endTime });
      this.editEvent.patchValue({ "description": this.selectedEvent.description });
      this.editEvent.patchValue({ "location": this.selectedEvent.location });
}
}
