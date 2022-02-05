import { Component } from '@angular/core';
import { GeneralService } from './services/general.service';
import * as GeneralReducer from 'src/app/store/general/general.reducer';
import * as GeneralActions from 'src/app/store/general/general.actions'
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'world-countries';

  constructor(
    private generalService: GeneralService,
    private generalStore: Store<GeneralReducer.State>) {
    this.getCountries();
  }

  getCountries() {
    this.generalService.getCountries().subscribe(
      (res: any) => {
        let countries  = res.sort(function (a: any, b: any) {
          var nameA = a.name.common.toUpperCase();
          var nameB = b.name.common.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        })
        this.generalStore.dispatch(GeneralActions.addCountries({ countries: countries }));
      }
    )
  }
}
