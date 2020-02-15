import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-router-splitting-demo',
  template: `
    <app-address-form></app-address-form>
    <app-my-tree></app-my-tree>
    <app-my-table></app-my-table>
    <app-my-dashboard></app-my-dashboard>
  `,
  styles: []
})
export class RouterSplittingDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
