import { Injectable } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import * as GeneralReducer from 'src/app/store/general/general.reducer'
import { Store } from '@ngrx/store';
import { addVisitedCountries } from '../store/general/general.actions';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(
        private apiService: ApiService,
        private darkModeService: DarkModeService,
        private store: Store<GeneralReducer.State>
    ) { }

    isDarkModeEnabled(): Observable<boolean> {
        return this.darkModeService.darkMode$
    }

    enableDarkMode(): void {
        this.darkModeService.enable();
    }

    disableDarkMode(): void {
        this.darkModeService.disable();
    }

    getCountries() {
        return this.apiService.get(`https://restcountries.com/v3.1/all`);
    }

    async getVisitedCountriesFromStorage(): Promise<Array<any>> {
        return await JSON.parse(localStorage.getItem('visited')!) ?? []
    }

    async addVisitedCountry(country?: any) {
        // Get visited countries from storage
        let visited = await this.getVisitedCountriesFromStorage();
        // Add new country
        if (country) visited = [...visited, country];
        // Remove duplicates
        const seen = new Set();
        visited = visited.filter((country: any) => {
            const duplicate = seen.has(country.name.common);
            seen.add(country.name.common);
            return !duplicate;
        });
        // Set in localstorage
        localStorage.setItem('visited', JSON.stringify(visited));
        // Save in store
        this.store.dispatch(addVisitedCountries({ visitedCountries: visited }))
    }
}
