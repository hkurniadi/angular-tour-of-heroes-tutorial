// This service class is to create a separate functionality to only provide hero data to components
// A service needs to be instantiated inside the using component from 'providers' metadata

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'; // <-- import 'toPromise()' method from RxJS

import { Hero } from './hero'; // <-- import Hero class
import { HEROES } from './mock-heroes'; // <-- import the HEROES data array

@Injectable() // <-- tells JavaScript to emit metadata about the service, the metadata specifies that Angular my need to inject other dependencies into this service
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  
  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    // This is just to simulate HTTP request to server which is asynchronous
    // return Promise.resolve(HEROES);
    // ---

    return this.http.get(this.heroesUrl) // http.get returns an RxJS Observable
               .toPromise() // converts the Observable from http.get() into Promise
               .then(response => response.json().data as Hero[]) // the data is an array of hero objects
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  // Simulate server latency with 2 seconds delay
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    // This is wasteful because we only need one hero, but we fetch all heroes and then filter it
    // return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    // ----

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Hero) // the data is a single object
               .catch(this.handleError);
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Hero)
               .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }
}