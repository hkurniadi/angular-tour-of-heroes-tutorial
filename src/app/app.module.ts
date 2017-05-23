import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- where ngModel directive lives
import { AppRoutingModule } from './app-routing.module'; // <-- separate the routing config in another files
import { HttpModule } from '@angular/http'; // <-- provides the HTTP services

// Import for loading and configuring the in-memory web api
// For the time being, use in-memory storage before setting up own server to store
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './hero-search.component';

@NgModule({
  imports: [ // <-- takes in necessary dependencies (i.e. other modules)
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [ // <-- takes in components, directives, pipes that belong to this module
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent
  ],
  providers: [ // <-- to include custom services into the global service collection
    HeroService // <-- this metadata tells Angular to create a singleton (since put in the app.module) instance of the service (i.e. HeroService) when it runs the NgModule, so that the service is available to all components
  ], 
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
