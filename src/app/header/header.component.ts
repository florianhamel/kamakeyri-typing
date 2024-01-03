import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type NavItem = {
  name: string;
  route: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly navItems: NavItem[] = [
    { name: 'Kamakeyri', route: '' },
    { name: 'Wiki Typing', route: 'wiki' }
  ];
}
