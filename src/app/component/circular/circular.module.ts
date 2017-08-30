import { NgModule } from '@angular/core'; 
import { CircularComponent } from './circular.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AddCircular } from './add/add';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : CircularComponent
			},
			{
				path : 'add-circular',
				component : AddCircular
			}
		])],
	declarations : [ CircularComponent, AddCircular ]
}) 
export class CircularModule {
	
}
