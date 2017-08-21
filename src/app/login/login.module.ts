import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
	imports: [ReactiveFormsModule,FormsModule,RouterModule.forChild([{
	 path: '', component: LoginComponent 
	 }])],
	declarations : [LoginComponent],
	exports: [RouterModule],
	providers:[LoginService]
})
export class LoginModule { }