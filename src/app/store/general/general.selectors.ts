import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as GeneralReducer from './general.reducer';

export const featureSelector = createFeatureSelector<GeneralReducer.State>(GeneralReducer.generalFeatureKey);

export const selectCountries = createSelector(
    featureSelector,
    (state: GeneralReducer.State) => state.countries
)

export const selectVisitedCountries = createSelector(
    featureSelector,
    (state: GeneralReducer.State) => state.visitedCountries
)
