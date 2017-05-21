import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  // template: `<h3>My Dashboard</h3>,`
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { // One of the purposes of constructor method is to do dependency injection (i.e. injects services or other modules)
    // The constructor's parameter tells it to create/initialize a private variable/property called heroService to hold the HeroService
    // Even though not mentioned within the constructor method, the private variable (or service now) named heroService still can be used within DashboardComponent
  }

  ngOnInit(): void {
    // Showing just top 4
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}