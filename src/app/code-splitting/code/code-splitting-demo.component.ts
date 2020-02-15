import { Component, OnInit, Compiler } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-code-splitting-demo',
  template: `
   <h3>Code Splitting Demo</h3>
   <button 
      [class.loaded]="compilerLoaded"
      (click)="loadCode()">
          Load @angular/compiler
    </button>
    <pre>
      {{ jsonCompiler }}
    </pre>
  `,
  styles: []
})
export class CodeSplittingDemoComponent implements OnInit {
  compilerLoaded = false;

  constructor(public compiler : Compiler) { 
    this.jsonCompiler = JSON.stringify(compiler);
  }

  jsonCompiler:string;

  ngOnInit() {
  }

  async loadCode(){
    // import('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js')
    const { CompilerConfig , JitCompiler , ViewCompiler } = await import( '@angular/compiler');
    const {JitCompilerFactory} = await import('@angular/platform-browser-dynamic');

    const jit :any = JitCompilerFactory;

    const compilerFactory = new jit([{useJit:true}]);

    const compiler = compilerFactory.createCompiler([{useJit:true}]);

    this.compilerLoaded = true;
    
  }
}
