import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CmpSplittingDemoComponent } from './component/cmp-splitting-demo.component';
import { SplittingDemosComponent } from './splitting-demos.component';
import { CodeSplittingDemoComponent } from './code/code-splitting-demo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path : '' ,
        component : SplittingDemosComponent, 
        children : [
          { path : 'code'      , component : CodeSplittingDemoComponent  },
          { path : 'component' , component : CmpSplittingDemoComponent   },
          { 
            path : 'router'    , 
            loadChildren : ()=> import('./router/router-splitting.module')
                                  .then(m=>m.RouterSplittingModule)
          },
        ]
      }
    ]),
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  declarations: [SplittingDemosComponent]
})
export class CodeSplittingModule { }
