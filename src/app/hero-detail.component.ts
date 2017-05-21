import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap'; // <-- import switchMap operator to use later with the route parameters Observable

import { Hero } from "./hero";
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero; // <-- make 'hero' property as 'input', so only then that it can be bound (i.e. property binding) in the hero-detail element tag in the parent's template

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params // params Observable from ActivatedRoute is used to extract the 'id' parameter in the URL
        .switchMap((params: Params) => this.heroService.getHero(+params['id'])) // route parameter is always a string, so needs to be converted using the JavaScript '+' operator to convert into number
        .subscribe(hero => this.hero = hero); // subscribe method is to detect 'id' changes and to (re)set the retrieved Hero
  }

  goBack(): void { // <-- this is another way to navigate backward one step in the browser history
    this.location.back(); // it's using the Location service
  }

  save(): void {
    this.heroService.update(this.hero)
        .then(() => this.goBack());
  }
}