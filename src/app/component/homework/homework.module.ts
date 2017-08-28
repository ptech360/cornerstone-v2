import { NgModule } from '@angular/core';
import { HomeworkComponent } from './homework.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { CurrentHomework } from './current/homework';
import { PassedHomework } from './passed/homework';

@NgModule({
	imports: [SharedModule, RouterModule.forChild([
		{path : '' , redirectTo:'current-homework' , pathMatch:'full'},
		{
			path: '',
			component: HomeworkComponent,
			children: [
				{
					path: 'current-homework',
					component: CurrentHomework
				},
				{
					path: 'passed-homework',
					component: PassedHomework
				}
			]
		}

	])],
	declarations: [HomeworkComponent, CurrentHomework, PassedHomework]
})
export class HomeworkModule {

}
