import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * First Thing we have to do is import the components that we want to
 * set up routing for
 */
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

/**
 * Inside the Routes = [] array, there is where we insert our paths. {} Means objets within an array
 * Each object takes two things. path and component as you can see below. 
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { 
    //route parameter -> /:nameOfParameter or multiple ones as well /:randomParameter/:thisotherparameter:/soOnandSoForth
    path: 'about/:id',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
