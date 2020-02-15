import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModule } from './my-material.module';
import { PwaDemosComponent } from './pwa/pwa-demos.component';

@NgModule({
  declarations: [
    AppComponent,
    PwaDemosComponent,
  ],
  imports: [
    
    // Angular Modules
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule, 
    HttpClientModule,  

    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),

    // My Modules
    AppRoutingModule,
    MyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
