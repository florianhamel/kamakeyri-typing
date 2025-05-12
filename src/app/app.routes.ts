import { Routes } from '@angular/router';
import { Route } from './domain/enums/route.enum';
import { HomeComponent } from './presentation/components/home/home.component';
import { WikiTypingComponent } from './presentation/components/wiki-typing/wiki-typing.component';
import { CommonWordsComponent } from './presentation/components/common-words/common-words.component';
import { DashboardComponent } from './presentation/components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: Route.Home, component: HomeComponent },
  { path: Route.Wiki, component: WikiTypingComponent },
  { path: Route.CommonWords, component: CommonWordsComponent },
  { path: Route.Dashboard, component: DashboardComponent }
];
