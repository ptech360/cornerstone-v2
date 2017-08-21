import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>
  <a class='links' routerLink = 'login'>login</a>
  <a class='links' routerLink = 'home'>Home</a>
  <router-outlet></router-outlet>`,
})
export class AppComponent  { title = 'Multiple Module App'; }
