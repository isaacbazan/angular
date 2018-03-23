import { Component, OnInit } from '@angular/core';
//Importing animation specific functions
import {trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import {DataService} from '../data.service';
//The animations are also defined here withing this @Component Element
//With the name animation: []
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  /**
   * If you have a really small amount of template code you can add
   * template: ` <p> HTML HERE </p>, `
   * We can do the same thing with the styleUrls section as well
   * EG styles: [` p { style here  }`]\
   * We usually don't want to use those like that*/

  styleUrls: ['./home.component.scss'],
  /**
   * The first animation specific function we use is trigger to set up an animation
   * First paramenter for trigger() gets the name for the animation and second paramenter gets an array
   * where a number of different animation specific functions will reside
   */
  animations : [
    trigger('goals', [
      //This transition will get activated when any element state goes to any state
      transition('* => *', [
        //Animation Specific Function
        //When something enters the DOM
        query(':enter', style({opacity:0}), {optional: true}),
        //Stagger is a function that allows you to take a number of elements 
        //of the DOM and the delay that you set up will place a delay on when each
        //subsequent DOM element will start to animate
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))
        ]), {optional: true}),
        //When anything leaves the DOM
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
          ]))
        ]), {optional: true})

      ])
    ])
  ]
})
/**
 * Interpolation: This is used for the purpose of whenver we are in need of communicating properties
 * that are defined within our component class, then we use interpolation in the template to display 
 * those values or those properties. On the template file interpolation is defined by using {{ propertyName }}
 * 
 * Property Binding: This is works similarly to Interpolation, it is defined by [htmlCustomAttributeName]. So using this 
 * makes use not use the {{}} anymore to get a certain value. 
 * 
 * Two Way Data Binding: For example, what if we wanted to use an input text to both retrieve and set the value for a 
 * certain var or db table. This is done with the ng-model. In order for us to do this and have access to ng-module
 * we need to import forms-module going to app.module.ts. The way this is defined on the template is this way
 * [(ng-model)]="propertyName"
 * 
 * Event Binding: We can use Event Binding to capture a variety of user-initiated events to initiate logic in our
 * component class. You Define Click Events on the Template by wrapping them within parenthesis E.g (click)="callMethod()"
 */
export class HomeComponent implements OnInit {

  //This is how a property is created
  itemCount : number;
  btnText : string = "Add Item";
  goalText : string = "My First Life Goal";
  //Defining an Array
  //To iterate thru this array we need to use ng-for 
  goals = [];
  /**
   * Here we are going to create an instance of the Service that we are going to use for this component 
   * called dependency injection
   */
  constructor(private _data : DataService) { }

  //This is a lifecycle hook which is initiated when the app loads or the component itself loads
  //Any code here will get run when the component is loaded. 
  ngOnInit() {
    //Here we access the Data service thru the _data object/instance and we acess the goal and subscribe it, meaning
    //that we get to have the response on a var on the second parameter 
    this._data.goal.subscribe(res => this.goals = res);
    //Gets THIS property value itemCount and assigns the lenght value of the goals array to it. 
    this.itemCount = this.goals.length;
    
  }

  //Method that will be called on the Event Binding (click)
  addItem(){
    //Text Value gets pushed from goalText property (which is provided by user input) to the Array goals
    //to be saved there
    this.goals.push(this.goalText);
    //Goal Text is set to an empty string so that the user can add another one again without
    //having to clear the input himself with backspace
    this.goalText = '';
    //The array number is counted again and returned to the itemCount Property to be displayed by interpolation. 
    this.itemCount = this.goals.length;
    //Calling the Method from DataService that updates goals 
    this._data.changeGoal(this.goals);
  }

  //Method that removes the item from the view
  removeItem(i){
    //Removes Item according to Index provided
    //First Parameter Gives the index positon of the array
    //Second Parameter tells the function how many records is it that has to 
    //be deleted which is just one. 
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }

}
