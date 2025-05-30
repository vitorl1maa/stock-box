import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home', loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'register', loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  { path: '', redirectTo: '', pathMatch: "full" }
];
