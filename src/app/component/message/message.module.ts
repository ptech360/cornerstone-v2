import { NgModule } from '@angular/core'; 
import { MessageComponent } from './message.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : MessageComponent
			}
			
		])],
	declarations : [ MessageComponent ]
}) 
export class MessageModule {
	
}
