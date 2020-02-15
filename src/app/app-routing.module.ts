import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PwaDemosComponent } from './pwa/pwa-demos.component';


const routes: Routes = [
  { 
    path : 'code-splitting' , 
    loadChildren : () => import('./code-splitting/code-splitting.module')
                           .then( m => m.CodeSplittingModule) 
  },
  { 
    path: 'pwa',
    component : PwaDemosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
