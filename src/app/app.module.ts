import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { RouterModule, Routes } from '@angular/router';
export const routes : Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch : 'full' 
	},
	{
		path : 'login',
		loadChildren : 'app/login/login.module#LoginModule'
	},
	{
		path : 'home',
		loadChildren : 'app/home/home.module#HomeModule'
	}
	];
@NgModule({
  imports:      [ ReactiveFormsModule, BrowserModule, RouterModule.forRoot(routes),FormsModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
