import { NgModule } from '@angular/core'; 
import { CircularComponent } from './circular.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';


@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : CircularComponent
			}
		])],
	declarations : [ CircularComponent, ]
}) 
export class CircularModule {
	
}
