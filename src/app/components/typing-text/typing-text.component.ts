import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTypingState } from '../../store/typing/typing.selectors';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TypingState } from '../../models/types';
import { typingActions } from '../../store/typing/typing.actions';

@Component({
  selector: 'app-typing-text',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './typing-text.component.html'
})
export class TypingTextComponent implements OnInit {
  @Input() text: string = 'Coffee is a beverage brewed from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. It has the highest sales in the world market for hot drinks.';

  session$: Observable<TypingState> = this.store.select(selectTypingState);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(typingActions.startSession({ content: this.text }));
  }
}
