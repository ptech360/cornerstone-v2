import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';

@Component({
	selector : 'reset-pass',
	templateUrl : './resetPassword.component.html',
	// styleUrls : ['./resetPassword.component.css']
})
export class ResetPassword { 
	
	error : boolean = false;
	resetform:any=new FormGroup({
       oldPassword : new FormControl(''),
       newPassword : new FormControl(''),
       confirmPassword : new FormControl('')
    });

    constructor(private authService : AuthService){
       
    // this.forgotform=this.initForm()
  }
  onclick(){
  	this.error = false;
  }
  onSubmit(npass:any,cnpass:any){
  	if(npass.value!=cnpass.value){
    	this.error=true;
    	return;
    }
  	this.authService.resetPassword(this.resetform.value)
    .subscribe(response => {
    },err => {
    });
    

  }
 
}