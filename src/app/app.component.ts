import { Component } from '@angular/core';
declare let $: any;

@Component({
  selector: 'my-app',
  templateUrl : './app.component.html',
})
export class AppComponent  { name = 'Angular';
  constructor(){

  }
}
