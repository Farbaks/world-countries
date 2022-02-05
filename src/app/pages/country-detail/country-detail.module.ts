import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryDetailRoutingModule } from './country-detail-routing.module';
import { CountryDetailComponent } from './country-detail.component';


@NgModule({
  declarations: [
    CountryDetailComponent
  ],
  imports: [
    CommonModule,
    CountryDetailRoutingModule
  ]
})
export class CountryDetailModule { }
