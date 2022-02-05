import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as GeneralReducer from 'src/app/store/general/general.reducer'
import { Store } from '@ngrx/store';
import { addVisitedCountries } from 'src/app/store/general/general.actions';
import { selectCountries, selectVisitedCountries } from 'src/app/store/general/general.selectors';
import { GeneralService } from 'src/app/services/general.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  subscription1$!: Subscription
  subscription2$!: Subscription
  // 
  fetchingData: boolean = true;
  countryName!: string;
  country: any = {};
  visitedCountries: Array<any> = [];
  borderCountries: Array<any> = [];
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private generalStore: Store<GeneralReducer.State>,
    private generalService: GeneralService
  ) {
    this.route.params.subscribe(p => {
      window.scrollTo(0, 0);
      this.countryName = p.name;
      this.getCountries();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe()
    this.subscription2$.unsubscribe()
  }

  goBack() {
    this.location.back();
  }

  getCountries() {
    this.fetchingData = true;
    this.borderCountries = [];
    this.subscription1$ = this.generalStore.select(selectCountries).subscribe(
      (res: any) => {
        if (res.length != 0) {
          this.country = { ...res.find((country: any) => country.name.common.toLowerCase() == this.countryName.toLocaleLowerCase()) };
          this.country.languages = Object.entries(this.country.languages ?? {});
          this.country.currencies = [...Object.keys(this.country.currencies ?? {})];
          // Set border countries
          if (this.country.borders) {
            this.country.borders.forEach((item: any) => {
              let country = res.find((country: any) => country.cca3.toLowerCase() == item.toLocaleLowerCase())
              this.borderCountries.push(country);
            });
          }

          this.getVisitedCountry();
          setTimeout(() => {
            this.fetchingData = false;
          }, 500);
          
        }

      }
    )
  }

  getVisitedCountry() {
    this.generalService.addVisitedCountry(this.country);
    // 
    this.visitedCountries = [];
    this.subscription2$ = this.generalStore.select(selectVisitedCountries).subscribe(
      (res: any) => {
        this.visitedCountries = res.filter((country: any) => country.name.common.toLowerCase() != this.countryName.toLowerCase());
      }
    )
  }

}
