import {Component} from '@angular/core';

import { LoaderStop } from "../../providers/loaderstop.service"; 

@Component({
  selector:'error404',
  templateUrl:'./error404.html',
  styleUrls:['./error.component.css']
})

export class Error404Component{
	constructor(private ls : LoaderStop){
		ls.setLoader(false);
	}

}