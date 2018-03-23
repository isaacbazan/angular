/**
 * Service Files are Generally used for making http calls or 
 * sharing data between components
 * One of the best ways to share data between components is to use rxjs behaviour subject library.
 * To use this service we need to import the DataService into the app.module.ts for us to be able to use it.
 * This file needs to be also imported at the top of the component that will use it. 
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  
  /**
   * Here we are going to be sharing the same goals array that we have defined on one of our components 
   * so that all components can access it from this service
   */
  // We are instantiating a new object BehaviorSubject of type <any> meaning any data type and within
  // parenthesis we initialize an array with hardcoded data just for test purposes. 
  //This goals instance is only accessible to this component
  private goals = new BehaviorSubject<any>(['The initial goal', 'Another silly life goal']);

  //This goal instance is observable because it can be found by other components when called by its name. 
  goal = this.goals.asObservable();

  constructor() { }

  //This Instance will be accessible to other components
  //when we don't specify the level of security of the function, be it protected, private etc. 
  //the method becomes automatically public, meaning that other components are able to access it. 
  changeGoal(goal){
    this.goals.next(goal);
  }
}
