import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-splitting-demos',
  template: `
  <div class="border">
    <nav mat-tab-nav-bar>
      <a mat-tab-link
        *ngFor="let link of navLinks"
        [routerLink]="link"
        routerLinkActive #rla="routerLinkActive"
        [class.active]="rla.isActive">
        {{link}}
      </a>
    </nav>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styles: []
})
export class SplittingDemosComponent implements OnInit {

  navLinks = [ 'router' , 'code' , 'component'  ];
  


  ngOnInit() {
  }

}
