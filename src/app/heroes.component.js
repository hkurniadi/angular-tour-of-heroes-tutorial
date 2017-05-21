"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var hero_service_1 = require("./hero.service");
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
var HeroesComponent = (function () {
    function HeroesComponent(heroService, router) {
        // Constructor should only do simple initialization
        // Fetching data should be done in ngOnInit lifecycle hook
        this.heroService = heroService;
        this.router = router;
        // Instead of writing this way in constructor (i.e. calling the getHeroes() method in constructor)
        // this.heroes = this.heroService.getHeroes();
    }
    // You can write it this way, so that you do not call the method inside the constructor
    HeroesComponent.prototype.getHeroes = function () {
        // This is the synchronous way
        // this.heroes = this.heroService.getHeroes();
        var _this = this;
        // This is the async way
        // Since getHeroes() returns a promise, it has to be resolved
        this.heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
        // This statement is to simulate server latency
        // this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    };
    HeroesComponent.prototype.ngOnInit = function () {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // Call this service to fetch data in this lifecycle hook instead
        this.getHeroes();
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    HeroesComponent.prototype.gotoDetail = function () {
        // Another way to navigate other than from <a> tag
        // This approach is the imperative approach by telling the router where to go
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    HeroesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService.delete(hero.id)
            .then(function () {
            /*
            Even though the deletion is delegated to heroService,
            the component is still responsible to update the display
            i.e. by removing the deleted hero from the heroes array and resetting the selectedHero if necessary
            */
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; }); // <-- updating the display by removing the deleted hero from the heroes array
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        });
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    core_1.Component({
        selector: 'my-heroes',
        templateUrl: './heroes.component.html',
        styleUrls: ['./heroes.component.css']
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        router_1.Router])
], HeroesComponent);
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map