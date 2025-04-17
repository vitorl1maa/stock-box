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
    {path: '', redirectTo: '', pathMatch: "full"}
];
