/**
 * Created by Eyal on 9/2/2020.
 */
import {NgModule} from "@angular/core";
import { SquareComponent } from './components/square.component';
import { RectangleComponent } from './components/rectangle.component';
import { CircleComponent } from './components/circle.component';
import { TriangleComponent } from './components/triangle.component';

export declare type Shape = 'circle' | 'triangle' | 'square' | 'rectangle';

const shapes = [
     SquareComponent
    ,RectangleComponent
    ,CircleComponent
    ,TriangleComponent
];

@NgModule({
    declarations   :[ shapes ],
    exports        :[ shapes ],
    entryComponents:[ shapes ]
})
export class ShapesModule{
    shapes = new Map<string,any>();

    constructor(){
        this.shapes.set( 'Square'    , SquareComponent);
        this.shapes.set( 'Rectangle' , RectangleComponent);
        this.shapes.set( 'Circle'    , CircleComponent);
        this.shapes.set( 'Triangle'  , TriangleComponent);
    }
}