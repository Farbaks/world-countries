import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as GeneralReducer from 'src/app/store/general/general.reducer'
import { Store } from '@ngrx/store';
import { selectCountries, selectVisitedCountries } from 'src/app/store/general/general.selectors';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  subscription1$: Subscription = new Subscription();
  subscription2$: Subscription = new Subscription();
  // 
  fetchingData: boolean = true;
  countryName!: string;
  country: any = {};
  visitedCountries: Array<any> = [];
  borderCountries: Array<any> = [];
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private generalStore: Store<GeneralReducer.State>,
    private generalService: GeneralService
  ) {
    this.route.params.subscribe(p => {
      window.scrollTo(0, 0);
      this.subscription1$.unsubscribe();
      this.subscription2$.unsubscribe();
      this.countryName = p.name;
      this.getCountries();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  getCountries() {
    this.fetchingData = true;
    this.borderCountries = [];
    this.subscription1$ = this.generalStore.select(selectCountries).pipe(take(2)).subscribe(
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

          // Set this country as visited
          this.generalService.addVisitedCountry(this.country);

          // Get list of visited countries
          this.getVisitedCountry();
          setTimeout(() => {
            this.fetchingData = false;
          }, 500);
        }
      }
    )
  }

  getVisitedCountry() {
    this.visitedCountries = [];
    this.subscription2$ = this.generalStore.select(selectVisitedCountries).pipe(take(1)).subscribe(
      (res: any) => {
        this.visitedCountries = res.filter((country: any) => country.name.common.toLowerCase() != this.countryName.toLowerCase());
        // Take latest 5 visited countries
        if (this.visitedCountries.length > 5) {
          this.visitedCountries = this.visitedCountries.slice((this.visitedCountries.length - 5), this.visitedCountries.length)
        }
        console.log(1)
      }
    )
  }
}
