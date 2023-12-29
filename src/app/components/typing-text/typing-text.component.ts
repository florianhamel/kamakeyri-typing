import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing-text',
  standalone: true,
  imports: [],
  templateUrl: './typing-text.component.html'
})
export class TypingTextComponent {
  @Input() text!: string;
}
