import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimetableComponent } from './timetable.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	imports : [ CommonModule, FormsModule, RouterModule.forChild([
			{
				path : '',
				component : TimetableComponent
			}
		])],
	declarations : [TimetableComponent]

})
export class TimeTable{

}