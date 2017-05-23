import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> { // the search() method will return an Observable of hero arrays
    return this.http.get(`app/heroes/?name=${term}`)
               .map(response => response.json().data as Hero[]) // map() is used to extract heroes from the response data, and 'as Hero[]' will type cast the returned data into a Hero-array type
  }
}