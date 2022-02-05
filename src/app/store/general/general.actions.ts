import { createAction, props } from '@ngrx/store';

export const addCountries = createAction(
  '[General] Add Countries',
  props<{ countries: Array<any> }>()
);

export const addVisitedCountries = createAction(
  '[General] Add Visited Countries',
  props<{ visitedCountries: Array<string> }>()
)
