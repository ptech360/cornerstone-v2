import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [RouterModule.forChild([{
	 path: '', component: HomeComponent 
	 }])],

	declarations : [HomeComponent],
	exports: [RouterModule]
})
export class HomeModule{
}