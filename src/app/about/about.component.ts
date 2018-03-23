import { Component, OnInit } from '@angular/core';
//This import will allow us to retrieve the parameters that we have set for our about page
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {DataService} from '../data.service';
//In order to be able to start retrieving parameters we need to first create an instance of
// ActivatedRoute



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  //Defining goals property of any data type;
  goals : any;
  /** We create an instance thru what is called dependency injection and that happens within 
   * the contrustructor right below. 
   * private -> this keyword sets the level of permission of access for this specific instance
   * the name that follows which is route in this case contains the instance that is to follow
   * after the : goes the class name of which we're making an instance of which in this case is 
   * ActivatedRoute
   */

  constructor(private route : ActivatedRoute, private router : Router, private _data : DataService) { 
    //This contructor is called when the component is loaded

    /**
     * this.route makes reference to the recently instatiated object which is route making reference to ActivatedRoute
     * We are then able to access other functions thru this object and one of them is params which we want to use
     * in order to retrieve params and display it. Then after calling params we call subscribe, and this function right here
     * allows us to receive the response annd display it. 
     * Ordinarily we would define a property here and bind that property on the DOM to display it on the Template
     */
   this.route.params.subscribe(res => console.log(res.id));

  }


  ngOnInit() {

    this._data.goal.subscribe(res => this.goals = res); 
  }
  
  sendMeHome(){
    this.router.navigate(['']);
  }
}
