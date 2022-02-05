
import { Action, createReducer, on } from '@ngrx/store';
import * as GeneralActions from './general.actions';

export const generalFeatureKey = 'general';

export interface State {
  countries: Array<any>
  visitedCountries: Array<string>
}

export const initialState: State = {
  countries: [],
  visitedCountries: []
};

export const reducer = createReducer(
  initialState,
  on(GeneralActions.addCountries, (state: State, { countries }) => ({
    ...state,
    countries: [...countries]
  })),
  on(GeneralActions.addVisitedCountries, (state: State, { visitedCountries }) => ({
    ...state,
    visitedCountries: [...visitedCountries]
  }))
);

export function GeneralReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}

