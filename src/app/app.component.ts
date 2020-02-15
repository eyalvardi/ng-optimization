import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `  
  <mat-sidenav-container class="sidenav-container">  
    <mat-sidenav #drawer class="sidenav" fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false">
      <mat-toolbar>Menu</mat-toolbar>
      <mat-nav-list>
        <a mat-list-item  (click)="drawer.toggle()" [routerLink]="['/code-splitting']" routerLinkActive="router-link-active" >Code-splitting</a>
        <a mat-list-item (click)="drawer.toggle()"  [routerLink]="['/pwa']"  routerLinkActive="router-link-active">PWA</a>
        <a mat-list-item (click)="drawer.toggle()" href="#">Links</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button
          type="button"
          aria-label="Toggle sidenav"
          mat-icon-button
          (click)="drawer.toggle()"
          *ngIf="isHandset$ | async">
          <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
        </button>
        <span [routerLink]="['/']" >ng-optimization</span>
        <span class="example-spacer"></span>
        <mat-icon class="example-icon" routerLink="code-splitting">favorite</mat-icon>
        <mat-icon class="example-icon" routerLink="pwa" aria-hidden="false" aria-label="Example delete icon">home</mat-icon>
      </mat-toolbar> 
      <!-- Add Content Here -->
      <div class="main-content">
        <router-outlet></router-outlet>
        <span class="loader" *ngIf="routerLoading">
          <mat-spinner></mat-spinner>
        </span>
      </div>      
    </mat-sidenav-content>
</mat-sidenav-container>  
  `,
  styles: []
})
export class AppComponent {
  title = 'ng-optimization';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  routerLoading = false;
  httpLoading   = false;
  
   constructor(
                private breakpointObserver: BreakpointObserver,
                private router: Router
              ) 
    {
           this.routerLoading= false;
           router.events.subscribe( (event: RouterEvent): void => {
               if (event instanceof NavigationStart) {
                 this.routerLoading= true;
               } else if (event instanceof NavigationEnd) {
                 this.routerLoading= false;
               }
             }
           );

   }
}
