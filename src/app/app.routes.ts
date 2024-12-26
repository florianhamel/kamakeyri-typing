import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { WikiComponent } from './components/wiki/wiki.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'log-in', component: LogInComponent }
];
