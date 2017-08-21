import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent} from './app.component';
import { LoginModule } from './login.module';
import { MainModule } from "./component/main/main.module";


@NgModule({
	imports : [ LoginModule, MainModule , BrowserModule, RouterModule.forRoot([
		{
			path : '',
			redirectTo : 'login',
			pathMatch : 'full'
		},
		{
			path : 'login',
			loadChildren : 'app/login.module#LoginModule'
		},
		{
			path : 'main',
			loadChildren : 'app/component/main/main.module#MainModule'
		}
	]) ],

	declarations : [AppComponent],

	bootstrap : [AppComponent]
})
export class AppModule{
}
