// This component is also called the 'router component' because it is simply the app shell that navigates the app to different views

import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <!-- The routerLink here is not using binding syntax because it navigates to a fixed path, so it's only using the one-time binding -->
      <!-- See 'One-time string initialization' section in Template Syntax Docs -->
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <!-- <my-heroes></my-heroes> -->
    <!-- Instead of using my-heroes tag, use <router-outlet> where the router will display the component below this tag when a link that goes to the corresponding path is clicked -->
    <router-outlet></router-outlet>
    <!-- if there is no router-outlet then the path will not show the corresponding component -->
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}