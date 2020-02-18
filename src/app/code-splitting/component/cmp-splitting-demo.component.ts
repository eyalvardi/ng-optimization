import { environment } from './../../../environments/environment';
import { codeSamples, CodeSample } from './samples-code';
import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, Injector, ComponentFactoryResolver, ComponentRef, ElementRef } from '@angular/core';
import { Loader } from './loader.class';
import { Shape } from './shapes/shapes.module';

@Component({
  selector: 'app-cmp-splitting-demo',
  template: `
 <h4>Load & Create Component</h4>
  <button (click)="loadComponent('circle')"   >Circle</button>
  <button (click)="loadComponent('square')"   >Square</button>
  <button (click)="loadComponent('triangle')" >Triangle</button>
  <button (click)="loadComponent('rectangle')">Rectangle</button>  
  
  <div class="demo-area">
    <div class="demo-shapes">
      <h4>View Container Ref</h4> 
      <ng-template #cmpArea></ng-template>
    </div>
    <div class="code-area">
      <div class="samples">
            <button (click)="setCodeSample('sample1')">Sample 1</button>       
            <button (click)="setCodeSample('sample2')">Sample 2</button>       
            <button (click)="setCodeSample('sample3')">Sample 3</button>
      </div>
      <div class="html-area">
        <textarea #html wrap="off" class="code">
            {{code}}
        </textarea> 
      </div>
      <div>
        <button (click)="shapesDemo()">Create Angular Component</button>
      </div>
    </div>
  </div>

  `,
  styles: []
})
export class CmpSplittingDemoComponent {

  value = 0;
  dynamicComponent: any = null;

  @ViewChild('cmpArea', { read: ViewContainerRef }) cmpArea: ViewContainerRef;
  @ViewChild('html') htmlCode: ElementRef;

  code = codeSamples.sample1;

  loader: Loader;

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private resolver: ComponentFactoryResolver) {

    this.loader = new Loader(compiler, injector, resolver);
  }

  setCodeSample( sample : CodeSample ){    
    this.code = codeSamples[sample];
  }

  async shapesDemo() {
    const html = this.htmlCode.nativeElement.value;
    let shapesModule;
    const components = await Promise.all([
                this.importShapeComponent('circle'),
                this.importShapeComponent('triangle'),
                this.importShapeComponent('square'),
                this.importShapeComponent('rectangle')
              ]);

    if(!environment.production){
      const m = await import('./shapes/shapes.module')
      shapesModule = m.ShapesModule
    }          
    const componentFactory = await this.loader
              .createComponentOnTheFly( html , components , [shapesModule] );

    this.createComponent(componentFactory);
  }

  async loadComponent(shape: Shape = 'circle') {
    const cmpClass = await this.importShapeComponent(shape);
    const componentFactory = this.resolver.resolveComponentFactory(cmpClass);
    this.createComponent(componentFactory);
  }

  async importShapeComponent(shape: Shape){
    const shapeName = shape.replace(/^\w/, c => c.toUpperCase());
    const cmpClass = await import(`./shapes/components/${shape}.component`)
      .then(module => module[`${shapeName}Component`]);
      return cmpClass;
  }

  createComponent(componentFactory: any): ComponentRef<any> {
    this.cmpArea.clear();
    const componentRef = this.cmpArea.createComponent(componentFactory);
    componentRef.onDestroy(() => {
      componentRef.changeDetectorRef.detach();
    });
    return componentRef
  }

}
