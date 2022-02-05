import { Injectable } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(
        private apiService: ApiService,
        private darkModeService: DarkModeService
        ) { }

    onToggle(): void {
        this.darkModeService.toggle();
    }

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
}
