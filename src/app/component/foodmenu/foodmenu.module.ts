import { NgModule } from '@angular/core'; 
import { FoodmenuComponent } from './foodmenu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : FoodmenuComponent
			}
			
		])],
	declarations : [ FoodmenuComponent ]
}) 
export class FoodmenuModule {
	
}
