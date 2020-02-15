import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, Injector, ComponentFactoryResolver, NgModule, ComponentRef, ElementRef } from '@angular/core';
import { Loader } from './loader.class';
import { CommonModule } from '@angular/common';
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
    <div>
      <!-- <h4> Component Outlet</h4>
      <ng-container *ngComponentOutlet="dynamicComponent" ></ng-container> -->

    <textarea class="code" #html wrap="off">       
      <triangle name="1"></triangle>
      <circle name="2"></circle>      
      <square name="4"></square>
    </textarea>
    <button (click)="shapesDemo()">Create Angular Component</button>
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


  loader: Loader;

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private resolver: ComponentFactoryResolver) {

    this.loader = new Loader(compiler, injector, resolver);
  }


  async shapesDemo() {
    const html = this.htmlCode.nativeElement.value;
    const { ShapesModule } = await import(`./shapes/shapes.module`);
    const componentFactory = await this.loader.createComponentOnTheFly(html, ShapesModule);

    this.createComponent(componentFactory);
  }


  async getDynamicComponent(html: string = '', ...components) {

    class DynamicComponent { }

    const dynamicComponent = Component({ template: html })(DynamicComponent);

    class DynamicModule { }

    const dynamicModule = NgModule({
      imports: [CommonModule],
      declarations: [dynamicComponent, ...components]
    })(DynamicModule);

    let module = await this.compiler.compileModuleAndAllComponentsAsync(DynamicModule);
    const moduleRef = module.ngModuleFactory.create(this.injector);

    const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(DynamicComponent)
    const componentRef = this.cmpArea.createComponent(componentFactory);
    componentRef.onDestroy(() => {
      componentRef.changeDetectorRef.detach();
    });
  }

  async loadComponent(shape: Shape = 'circle') {
    const shapeName = shape.replace(/^\w/, c => c.toUpperCase());
    const cmpClass = await import(`./shapes/components/${shape}.component`)
      .then(module => module[`${shapeName}Component`]);
    this.dynamicComponent = cmpClass;

    const componentFactory = this.resolver.resolveComponentFactory(cmpClass);
    this.createComponent(componentFactory);
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
