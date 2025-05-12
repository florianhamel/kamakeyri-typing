import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './presentation/components/header/header.component';
import { FooterComponent } from './presentation/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = 'kamakeyri-session';
}
