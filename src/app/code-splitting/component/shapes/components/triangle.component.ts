        /**
 * Created by Eyal on 9/2/2020.
 */
import {Component,Input} from "@angular/core";
import { BaseShapeComponent } from "./base.shape.component";


@Component({
    selector : 'triangle',
    styles: [`
                .triangle {
                    display      : grid;
                    place-items  : center;
                    margin       : 8px;
                    width        : 0px;
                    height       : 0px;
                    border-left  : 25px solid transparent;
                    border-right : 25px solid transparent;
                    border-bottom: 50px solid green;
                }
`],
    template: `
<div class="triangle" [style.font-size]="fontSize">{{name}}</div>
`})
export class TriangleComponent  extends BaseShapeComponent {
}