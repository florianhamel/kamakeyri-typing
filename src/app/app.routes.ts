import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WikiComponent } from './components/wiki/wiki.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wiki', component: WikiComponent }
];
