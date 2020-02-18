import { environment } from './../../../environments/environment';
import {
    Compiler,
    Injector,
    ComponentFactoryResolver,
    Component,
    NgModule
} from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';


export class Loader {

    constructor(
        private compiler: Compiler,
        private injector: Injector,
        private resolver: ComponentFactoryResolver
    ) { }

    async loadCompileComponent(name: string, path: string): Promise<any> {
        try {
            const cmp = await import(path);
            return cmp;
        } catch (ex) {
            console.log(ex);
        }
    } 

    async createComponentOnTheFly(html: string, components : any[] , modules : any[] ) {

        const compiler = await this.createJitCompiler();
        compiler.clearCache();       

        class DynamicComponent {}
        const dynamicComponent = Component({ template: html })(DynamicComponent);

        class DynamicModule {}

        const devMeta = {
            imports: [ CommonModule , ...modules ],
            declarations: [ dynamicComponent ]
        };

        const prodMeta = {
            declarations: [                
                dynamicComponent,
                ...components,
                NgForOf,
                NgIf
            ]
        }

        const dynamicModule = NgModule( environment.production ? prodMeta : devMeta )(DynamicModule);
        

        const module    = await compiler.compileModuleAndAllComponentsAsync(dynamicModule);
        const moduleRef = module.ngModuleFactory.create(this.injector);

        const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(DynamicComponent)

        return componentFactory;
    }

    createJitCompiler(): Promise<Compiler> {        
        return import('@angular/compiler')
            .then(m => {
                const publishFacade = m.publishFacade;
                if (!window['ng']) {
                    window['ng'] = {};
                    publishFacade(window);
                }
            })
            .then(() => import(`@angular/platform-browser-dynamic`))
            .then(m => {
                const JitCompilerFactory: any = m.JitCompilerFactory;
                const compilerFactory = new JitCompilerFactory([{ useJit: true }]);
                const compiler = compilerFactory.createCompiler([{ useJit: true }]);
                return compiler;
            })
            .catch(ex => {
                console.log(ex);
            });
    }
}