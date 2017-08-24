import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent} from './app.component';
import { AuthGuard } from './AuthGuard';

@NgModule({
		declarations : [AppComponent],

	imports : [  BrowserModule, RouterModule.forRoot([
		//{
		//	path : '',
		//	redirectTo : 'login',
		//	pathMatch : 'full'
		//},
		{
			path : 'login',
			loadChildren : 'app/component/login/login.module#LoginModule'
		},
		{
			path : '',
			loadChildren : 'app/component/main/main.module#MainModule' , canActivate : [AuthGuard]
		}
	]) ],
	exports: [],
	bootstrap : [AppComponent],
	providers : [AuthGuard]
})
export class AppModule{

}
