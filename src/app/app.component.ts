import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './presentation/components/footer/footer.component';
import { HeaderComponent } from './presentation/components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = 'kamakeyri-session';
}
