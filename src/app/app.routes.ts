import { KwRoute } from './domain/constants/route.const';
import { AuthGuard } from './domain/guards/auth.guard';
import { CommonWordsComponent } from './presentation/components/common-words/common-words.component';
import { DashboardComponent } from './presentation/components/dashboard/dashboard.component';
import { HomeComponent } from './presentation/components/home/home.component';
import { WikiTypingComponent } from './presentation/components/wiki-typing/wiki-typing.component';

export const routes: KwRoute[] = [
  { path: '', component: HomeComponent },
  { path: 'wiki', component: WikiTypingComponent },
  { path: 'words', component: CommonWordsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
