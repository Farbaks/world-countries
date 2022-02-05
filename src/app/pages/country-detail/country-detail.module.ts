import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryDetailRoutingModule } from './country-detail-routing.module';
import { CountryDetailComponent } from './country-detail.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { generalFeatureKey, GeneralReducer } from 'src/app/store/general/general.reducer';


@NgModule({
  declarations: [
    CountryDetailComponent
  ],
  imports: [
    CommonModule,
    CountryDetailRoutingModule,
    NgxSkeletonLoaderModule,
    StoreModule.forFeature(generalFeatureKey, GeneralReducer),
  ]
})
export class CountryDetailModule { }
