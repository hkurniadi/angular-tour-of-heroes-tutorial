import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// The class is moved to hero.ts because of Angular style guide recommends one class per file
/*export class Hero { // <-- export the class so that it can be used elsewhere
  id: number;
  name: string;
}*/

// Mock data source; moved to mock-heroes.ts file
// Data access should not be stored in a component
/*const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];*/

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit  { 
  heroes: Hero[];
  selectedHero: Hero; // <-- create a variable called 'selectedHero' with type of 'Hero'

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {
    // Constructor should only do simple initialization
    // Fetching data should be done in ngOnInit lifecycle hook
    
    // Instead of writing this way in constructor (i.e. calling the getHeroes() method in constructor)
    // this.heroes = this.heroService.getHeroes();
  }
  
  // You can write it this way, so that you do not call the method inside the constructor
  getHeroes(): void {
    // This is the synchronous way
    // this.heroes = this.heroService.getHeroes();
    
    // This is the async way
    // Since getHeroes() returns a promise, it has to be resolved
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);

    // This statement is to simulate server latency
    // this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    // Call this service to fetch data in this lifecycle hook instead
    this.getHeroes(); 
  }
  
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    // Another way to navigate other than from <a> tag
    // This approach is the imperative approach by telling the router where to go
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
        .then(() => {
          /*
          Even though the deletion is delegated to heroService,
          the component is still responsible to update the display
          i.e. by removing the deleted hero from the heroes array and resetting the selectedHero if necessary
          */
          this.heroes = this.heroes.filter(h => h !== hero); // <-- updating the display by removing the deleted hero from the heroes array
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }
}
