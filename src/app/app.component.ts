import { Component } from '@angular/core';

//Component Decorator
//Helps Define the Structure of your Component
@Component({
  //ng selector
  selector: 'app-root',
  //This Defines where the actual html template will be located
  templateUrl: './app.component.html',
  //Where our Style css will be located at
  styleUrls: ['./app.component.scss']
})

//This is where all the logic resides for your Angular JS Application
export class AppComponent {
  title = 'app';
}
