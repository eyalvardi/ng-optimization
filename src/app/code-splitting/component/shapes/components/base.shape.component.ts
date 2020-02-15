/**
 * Created by Eyal on 12/24/2016.
 */
import {Input, Component} from "@angular/core";

@Component({template:''})
export class BaseShapeComponent {
    @Input()name:string;
    size:number = 1;

    ngOnInit(){
        const id = setInterval(()=>{
            this.size++;
            if(this.size > 20) clearInterval(id);
        },2000);
    }
    get fontSize(){
        return `${this.size}px`;
    }
}