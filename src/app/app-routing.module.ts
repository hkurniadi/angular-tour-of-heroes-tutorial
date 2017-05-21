import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // This is redirection to redirect the '/' path to the '/dashboard' path
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent  }, // <-- the router matches this route's path in the address bar and the component to be created and rendered when the path matches
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // <-- forRoot method supplies the Router service providers and directives needed and performs initial navigation 
  exports: [ RouterModule ] // this is the Angular export system, export RouterModule, so that other components that import AppRoutingModule can use RouterModule and its properties
})
export class AppRoutingModule {}