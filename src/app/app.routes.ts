import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WikiComponent } from './modules/wiki/components/wiki/wiki.component';
import { TrainingComponent } from './modules/training/components/training/training.component';
import { LogInComponent } from './modules/auth/components/log-in/log-in.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'log-in', component: LogInComponent }
];
