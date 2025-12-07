import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NgxCustomTooltipModule } from 'ngx-custom-tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxCustomTooltipModule,
    NgxCustomTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
