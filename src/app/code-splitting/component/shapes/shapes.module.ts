import { RouterModule } from '@angular/router';
/**
 * Created by Eyal on 9/2/2020.
 */
import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';

import { SquareComponent } from './components/square.component';
import { RectangleComponent } from './components/rectangle.component';
import { CircleComponent } from './components/circle.component';
import { TriangleComponent } from './components/triangle.component';

export declare type Shape = 'circle' | 'triangle' | 'square' | 'rectangle';

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            { path : '' , component : CircleComponent }
        ])
    ],
    declarations   :[  
        SquareComponent,
        RectangleComponent,
        CircleComponent,
        TriangleComponent, 
    ],
    exports        :[
        SquareComponent,
        RectangleComponent,
        CircleComponent,
        TriangleComponent,
    ]
})
export class ShapesModule{}