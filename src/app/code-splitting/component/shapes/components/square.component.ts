        /**
 * Created by Eyal on 9/2/2020.
 */
import {Component,Input} from "@angular/core";
import { BaseShapeComponent } from "./base.shape.component";

@Component({
    selector : 'square',
    styles: [`
                .square {
                    margin: 8px;
                    width: 50px;
                    height: 50px;
                    background: red;
                }
`],
    template: `
<div class="square" [style.font-size]="fontSize">{{name}}</div>
`})
export class SquareComponent extends BaseShapeComponent{

}