import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
@Component({
	selector:'app-login',
	templateUrl : './login.component.html'
}) 
export class LoginComponent{
	login : FormGroup;
	value : string;
	constructor(loginservice : LoginService){
		
		this.login = new FormGroup( {
			username : new FormControl(),
			password : new FormControl()
		});
		this.value = loginservice.value;	
	}

	onSubmit(){
		console.log(this.login.value);
	}
}