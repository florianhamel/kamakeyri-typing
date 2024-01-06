import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WikiComponent } from './wiki/components/wiki/wiki.component';
import { LogInComponent } from './auth/components/log-in/log-in.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'log-in', component: LogInComponent }
];
