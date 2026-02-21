import { KwRoute, kwRoute } from './domain/constants/route.const';
import { AuthGuard } from './presentation/guards/auth.guard';
import { CommonWordsComponent } from './presentation/components/common-words/common-words.component';
import { DashboardComponent } from './presentation/components/dashboard/dashboard.component';
import { HomeComponent } from './presentation/components/home/home.component';
import { WikiTypingComponent } from './presentation/components/wiki-typing/wiki-typing.component';

export const routes: KwRoute[] = [
  { path: kwRoute.home, component: HomeComponent },
  { path: kwRoute.wiki, component: WikiTypingComponent },
  { path: kwRoute.words, component: CommonWordsComponent },
  { path: kwRoute.dashboard, component: DashboardComponent, canActivate: [AuthGuard] }
];
