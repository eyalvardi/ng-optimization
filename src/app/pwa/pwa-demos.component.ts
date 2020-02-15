import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-pwa-demos',
  template: `
<div class="border">
<mat-tab-group>
  <mat-tab label="ngsw/state">
  <div class="main-content">
      <a href="./ngsw/state">ngsw/state</a> 
  </div>
  </mat-tab>
  <mat-tab label="Offline">
    <div class="main-content">
        <button (click)="loadUsers()">offline ({{users.length}})</button>
        <div class="user">
          <ng-container *ngFor="let user of users" >
              <img style="border-radius: 85%;" [src]="user.picture">
              <div style="align-self:center">{{user.name}}</div>
          </ng-container>
        </div>  
    </div>
  </mat-tab>
  <mat-tab label="Check Update">
    <div class="main-content">
      <button (click)="checkForUpdate()">check Update {{isUpdate}}</button>
    </div>
  </mat-tab>
  <mat-tab label="Update">
    <div class="main-content">
      <button (click)="update()">Update</button>
    </div>
  </mat-tab>
</mat-tab-group>
</div>
  `,
  styles: []
})
export class PwaDemosComponent implements OnInit {

  users: { name: string, picture: string }[] = [];
  isUpdate = false;

  constructor(
    private http: HttpClient,
    private swUpdate: SwUpdate
  ) { }

  initSwUpdate() {
    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

  async loadUsers(num:number = 10) {
    this.users = await this.http.get(`https://randomuser.me/api/?results=${num}`)
      .pipe(
        pluck('results'),
        map((users: any[]) => users.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large
        }))
        )
      ).toPromise();
  }

  async checkForUpdate() {
    this.isUpdate = true;
    await this.swUpdate.checkForUpdate();
    this.isUpdate = false;

  }
  update() {
    this.swUpdate.available.subscribe(
      event => {
        if (window.confirm('Update')) {
          this.swUpdate.activateUpdate()
            .then(() => document.location.reload());
        }
      });
  }

  ngOnInit(): void {
    this.initSwUpdate();
  }

}
