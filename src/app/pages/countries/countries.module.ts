import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    CountriesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    FormsModule,
    MatMenuModule,
    NgxSkeletonLoaderModule
  ]
})
export class CountriesModule { }
