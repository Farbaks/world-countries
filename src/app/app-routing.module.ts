import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'countries',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/countries/countries.module').then(m => m.CountriesModule)
      },
      {
        path: ':name',
        loadChildren: () => import('./pages/country-detail/country-detail.module').then(m => m.CountryDetailModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
