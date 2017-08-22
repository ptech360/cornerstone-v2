import { NgModule } from '@angular/core'; 
import { AddEmployeeComponent } from './addEmployee.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : AddEmployeeComponent
			}
			
		])],
	declarations : [ AddEmployeeComponent ]
}) 
export class AddEmployeeModule {
	
}
