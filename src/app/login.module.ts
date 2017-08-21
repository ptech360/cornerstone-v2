import { NgModule } from '@angular/core';
import { CommonService } from './providers/common.service';
import { Configuration } from './providers/app.constant';
import { CustomHttpService } from './providers/default.header.service';
import { AuthService } from './providers/auth.service';
import { LoginComponent } from './component/login/login.component';
import { ForgotPassword } from './component/login/forgot.password';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from  '@angular/common';
import { HttpModule } from '@angular/http';


@NgModule({
 imports : [ CommonModule , ReactiveFormsModule, HttpModule ,RouterModule.forChild([
 		{
 			path : '',
			 component : LoginComponent
			 
 		}
 	])],
 declarations : [ LoginComponent ],
 providers : [CommonService, Configuration , CustomHttpService, AuthService ]

})
export class LoginModule { } 