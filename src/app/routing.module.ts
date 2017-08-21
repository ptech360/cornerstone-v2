import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const routes : Routes = [
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
	imports : [RouterModule.forRoot(routes)],
	exports : [RouterModule] 
}) 
export class RoutingModule{}