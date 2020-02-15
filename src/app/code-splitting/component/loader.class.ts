import { Compiler, Injector, ComponentFactoryResolver, Type, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export class Loader {

    components = new Map<Type<any>, any>();

    constructor(
        private compiler: Compiler,
        private injector: Injector,
        private resolver: ComponentFactoryResolver
    ) { }

    async loadCompileComponent(name, path?: string): Promise<any> {
        try {
            const cmp = await import(path);
            this.components.set(name, cmp);
        } catch (ex) {
            console.log(ex);
        }
    }

    async loadAndCompileComponent(name, path?: string): Promise<any> {
        class DynamicModule { }
        try {
            const cmp = await import(path);
            const dynamicModule = NgModule({
                imports: [CommonModule],
                declarations: [cmp]
            })(DynamicModule);

            let module = await this.compiler.compileModuleAndAllComponentsAsync(DynamicModule);
            const moduleRef = module.ngModuleFactory.create(this.injector);

            const componentFactory = moduleRef
                .componentFactoryResolver
                .resolveComponentFactory(cmp)

            return componentFactory;


        } catch (ex) {
            console.log(ex);
        }
    }

    async createComponentOnTheFly(html: string, ...imports) {
        
        const compiler = await this.createJitCompiler();

        class DynamicComponent { }
        const dynamicComponent = Component({ template: html })(DynamicComponent);

        class DynamicModule { }

        const dynamicModule = NgModule({
            imports: [CommonModule, ...imports],
            declarations: [dynamicComponent]
        })(DynamicModule);

        const module = await compiler.compileModuleAndAllComponentsAsync(DynamicModule);
        const moduleRef = module.ngModuleFactory.create(this.injector);

        const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(DynamicComponent)

        return componentFactory;
    }

    async createJitCompiler()  : Promise<Compiler> {
        const { CompilerConfig, JitCompiler, ViewCompiler } = await import('@angular/compiler');
        const { JitCompilerFactory } = await import('@angular/platform-browser-dynamic');
        const jit: any = JitCompilerFactory;
        const compilerFactory = new jit([{ useJit: true }]);
        const compiler = compilerFactory.createCompiler([{ useJit: true }]);

        return compiler;
    }

}