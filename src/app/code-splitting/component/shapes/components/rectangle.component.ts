/**
 * Created by Eyal on 9/2/2020.
 */
import {Component,Input} from "@angular/core";
import { BaseShapeComponent } from "./base.shape.component";


@Component({
    selector : 'rectangle',
    styles: [`
                .rectangle {
                    margin: 8px;
                    width: 100px;
                    height: 50px;
                    background: blue;
                }
`],
    template: `
<div class="rectangle" [style.font-size]="fontSize">{{name}}</div>
`})
export class RectangleComponent  extends BaseShapeComponent {
}