import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as GeneralReducer from 'src/app/store/general/general.reducer'
import { selectCountries } from 'src/app/store/general/general.selectors';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  subscription1$: Subscription = new Subscription();
  // 
  fetchingData: boolean = true;
  selectedRegion: string = '';
  query: string = '';
  countries: Array<any> = [];
  filteredCountries: Array<any> = [];
  constructor(
    private generalStore: Store<GeneralReducer.State>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(p => {
      this.subscription1$.unsubscribe();
      this.getCountries(p);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe()
  }

  getCountries(p: any) {
    this.fetchingData = true;
    this.selectedRegion = '';
    this.subscription1$ = this.generalStore.select(selectCountries).subscribe(
      (res: Array<any>) => {
        this.filteredCountries = this.countries = [...res];

        if (![undefined, '', 'all'].includes(p.region)) {
          this.selectedRegion = p.region;

          this.filteredCountries = this.filteredCountries.filter((country: any) => {
            return country.region == p.region
          })
        }

        if (p.query) {
          this.query = p.query;

          this.filteredCountries = this.filteredCountries.filter((country: any) => {
            return country.name.common.toLowerCase().includes(p.query.toLowerCase())
          })

        }
        if (this.countries.length > 0) this.fetchingData = false;
      }
    )
  }

  resetQuery() {
    this.query = '';
    this.queryCountries();
  }

  queryCountries() {
    this.router.navigate(['/countries'],
      { queryParams: { query: this.query.trim(), region: this.selectedRegion } })
  }

  filterByRegion(region: string) {
    this.router.navigate(['/countries'], { queryParams: { query: this.query, region: region } })
  }

}
