import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppreciationService } from '../../../providers/appreciation.service';
import { CommonService } from '../../../providers/common.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderStop } from '../../../providers/loaderstop.service';

declare let $: any;
@Component({
  selector: 'add-appreciation',
  templateUrl: './add.html',
  styleUrls: ['./../appreciation.component.css']
})

export class AddAppreciation implements OnDestroy{
  public title: string = "New Appreciation";
  public appreciation: FormGroup;
  public submitProgress: boolean = false;
  public stan: any;
  public isEmpty = true;
  public searchQuery : any;
  standards: any = [];
  public standardId: any ='';
  public standard:any;
  students: any = [];
  studentscopy: any = [];
  subjects: any = [];
  public studId: any ;
  public try : string ;
  public emptyStudents: boolean = true;
  public emptyStandards: boolean = true;
  public loader:boolean = false;
  public studentLoader:boolean=false;
  constructor(private appreciationService: AppreciationService,
    private commonService: CommonService,
    public router: Router,
    public ls : LoaderStop, 
    private _location: Location,

  ) {
    this.getStandards();
  }

  ngOnInit() {
    this.ls.setLoader(false);
    this.initForm();
  }
  ngOnDestroy(){
     this.ls.setLoader(true); 
    }

  trychange(ev:any){
    this.students = this.studentscopy;
    let val = ev.target.value;
    this.isEmpty = true;
    if (val && val.trim() != '') {
      this.isEmpty = false;
      this.students = this.studentscopy.filter((item: any) => {
        console.log(item);
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    }
  }

  public initForm() {
    this.appreciation = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(2500)]),
      studentId: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }
  submitAppreciation() {
    this.submitProgress=true;
    this.appreciationService.postAppreciation(this.appreciation.value).subscribe((res) => {
      this.submitProgress=false;        
      this.initForm();
      $('#appreciationModal').modal('show');
          setTimeout(()=>{
      $('#appreciationModal').modal('hide');

    },3000)
    }, (err) => {
      this.router.navigate(['/error']);

    });
  }
  public getStandards() {
    // this.nl.showLoader();
    this.loader = true;
    this.appreciationService.getStandards().subscribe((res) => {
      if (res.status === 204) {
        this.standards = [];
        this.emptyStandards = true;
        this.loader = false;
        return;
      }
      this.standards = res;
      console.log(this.standards);
      this.emptyStandards = false;
      this.loader = false;
    }, (err) => {
      this.router.navigate(['/error']);
    });
  }
  public searching(env: any ){
    this.searchQuery = env.target.value;
    console.log(this.searchQuery);

  }

  public selectstudent( s : any){
    console.log(s.id);
    (<HTMLInputElement>document.getElementById("try")).value = s.name;
     this.appreciation.controls["studentId"].patchValue(s.id);
     console.log(this.appreciation.controls["studentId"]);
     this.isEmpty = true;
  }

  public getStudents(standard:any) {
    this.studentLoader=true;
    this.appreciation.controls["studentId"].reset();
    this.appreciationService.getStudents(standard).subscribe((res) => {
      if(res.status===204){
        this.students = [];
        this.emptyStudents = true;
        this.studentLoader=false;
        return;
      }
      this.studentLoader=false;
      this.emptyStudents = false;
      this.students = res;
      this.studentscopy = res;
      
    }, (err) => {
      this.router.navigate(['/error']);
    });

  }

}