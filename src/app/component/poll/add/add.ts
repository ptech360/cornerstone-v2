import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { PollService } from '../../../providers/poll.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderStop } from '../../../providers/loaderstop.service';

declare let $: any;

@Component({
  selector: 'add-poll',
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})

export class AddPollComponent implements OnInit, OnDestroy {

  public pollInfo: any;
  public standards: any;
  public selectedStandard: any;
  public buttonlabel : string = 'Select Standard';
  // public disable: boolean = false;
  public loader: boolean = false;
  public submitProgress:boolean=false;
  public standardLoader:boolean=false;
  public infoLoader:boolean=false;
  public addPollForm: FormGroup;
  public pollType:any=[];  
  public pollOptionType:any=[];
  public questype : any = -1;
  public auditype : any = -1;
  constructor(public fb: FormBuilder,
    public cs: CommonService,
    public ps: PollService,
    public router:Router,
    private _location: Location,
    public ls? : LoaderStop,
) {
  }

  ngOnInit() {
    this.getPollInfo();
    this.initForm();
    this.ls.setLoader(false);
    this.getStandards(); 
  }
  ngOnDestroy(){
    this.ls.setLoader(true);
  }

  public initForm() {
    this.addPollForm = this.fb.group({
      'question': ['', [Validators.required]], //title
      'typeId': ['', [Validators.required]], //School, Class
      'expiredAt': [this.cs.getTomorrow(), [Validators.required]], //Due Date
      'optionTypeId': ['', [Validators.required]],
      // 'standardIds': ['',[Validators.required]],
      'subOptions': this.fb.array([
        this.initOptions(),
        this.initOptions(),], Validators.minLength(2)),
    })
  }

  check(a:any){
      if(a.checked == true){
        return true;
      }
      else{
         if( this.buttonlabel.indexOf(a.name) >= 0  ){
           return true;
         }
         return false;
      }
  }

  setDefault(){
    this.buttonlabel = "Select Standard";
    this.getStandards();
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
  getPollInfo() {
    this.infoLoader = true;
    this.cs.getPollInfo().subscribe(res => {
      this.pollInfo = res;
      this.pollType=this.pollInfo.pollType;
      this.pollOptionType=this.pollInfo.pollOptionType;
      // this.pollOptionType.splice(0,0,{id : -1 , name : 'Select Question Type'});
      
    this.infoLoader = false;      
    },
      err => {
      this.router.navigate(['/error']);
      })

  }

  public onTypeId(event: any) {
    if (event == "1") {
      this.addPollForm.removeControl("standardIds");
      this.selectedStandard = [];
      // this.disable = false;
    }
    else if (event == "2") {
      this.selectedStandard = [];
      // this.disable = true;
      this.addPollForm.addControl("standardIds", new FormControl('',Validators.required));
    }
  }
  stdIds: any = [];
  selectStandards(a:any,e: any) {

    if(e==true){
      this.stdIds.push(a.id);
      if(this.buttonlabel == 'Select Standard'){
        this.buttonlabel = ' '+a.name;
      }
      else{
        this.buttonlabel += ' ' + a.name;
      }
    }
    else if(e==false){
      
      let s : string = a.name; 
      this.buttonlabel = this.buttonlabel.replace( ' '+s , '');
      console.log(this.buttonlabel);
      if(this.buttonlabel == ''){
        this.buttonlabel = 'Select Standard';
      }
      this.stdIds.forEach((element:any, index:any)=>{
         if (element==a.id){
          this.stdIds.splice(index,1);
        }
      })
    }
    this.addPollForm.controls['standardIds'].patchValue(this.stdIds);
    console.log(this.stdIds);
  }

  public onStandards(ev: any) {
    // this.disable = false;
    var stan = ev;
    this.addPollForm.controls['standardIds'].patchValue(stan);
  }

  onDueDate(e: any) {
    if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
      $('#dateErrorModal').modal('show');
      this.addPollForm.controls['expiredAt'].patchValue(this.cs.getTomorrow());
    }
  }

  public initOptions() {

    return this.fb.group({
      choice: ['', [Validators.required]]
    });

  }

  public addOptions(e: any) {
    const control = <FormArray>e.controls['subOptions'];
    control.push(this.initOptions());
  }

  public removeOptions(form: any, index: any) {
    const control = <FormArray>form.controls['subOptions'];
    control.removeAt(index);
  }

  public submitPoll(obj: any) {
    setTimeout(()=>{
      $('#submitModal').modal('hide');

    },3000)
    this.submitProgress=true;
    this.ps.createPoll(obj).subscribe(res => {
    this.submitProgress=false;      
      $('#submitModal').modal('show');
    setTimeout(()=>{
      $('#submitModal').modal('hide');

    },3000)
      this.initForm();
    },
      err => {
        this.router.navigate(['/error']);
      })
  }

}