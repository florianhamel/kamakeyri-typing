import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { Route } from './domain/enums/route.enum';
import { WordsTypingComponent } from './components/words-typing/words-typing.component';
import { WikiTypingComponent } from './components/wiki-typing/wiki-typing.component';

export const routes: Routes = [
  { path: Route.Home, component: HomeComponent },
  { path: Route.Wiki, component: WikiTypingComponent },
  { path: Route.LogIn, component: LogInComponent },
  { path: Route.Words, component: WordsTypingComponent }
];
