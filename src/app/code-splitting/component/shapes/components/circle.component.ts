/**
* Created by Eyal on 9/2/2020.
*/
import { Component, Input } from "@angular/core";
import { BaseShapeComponent } from "./base.shape.component";

@Component({
    selector: 'circle',
    styles: [`
                .circle {
                    margin: 8px;
                    width: 50px;
                    height:50px;
                    background: yellow;
                    -moz-border-radius: 25px;
                    -webkit-border-radius: 25px;
                    border-radius: 25px;
                }
`],
    template: `
<div class="circle" [style.font-size]="fontSize">{{name}}</div>
`})
export class CircleComponent extends BaseShapeComponent {
}