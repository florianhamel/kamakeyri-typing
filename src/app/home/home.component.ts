import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [TranslateModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
