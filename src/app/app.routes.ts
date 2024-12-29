import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { WikiComponent } from './components/wiki/wiki.component';
import { Route } from './domain/enums/route.enum';

export const routes: Routes = [
  { path: Route.Home, component: HomeComponent },
  { path: Route.Wiki, component: WikiComponent },
  { path: Route.LogIn, component: LogInComponent }
];
