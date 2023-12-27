import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WikiTypingComponent } from './components/wiki-typing/wiki-typing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wiki-typing', component: WikiTypingComponent }
];
