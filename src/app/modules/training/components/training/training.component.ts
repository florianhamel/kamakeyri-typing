import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Exercise } from '../../models/training.types';
import { selectExercises } from '../../store/training.selectors';

@Component({
  standalone: true,
  selector: 'app-training',
  imports: [],
  templateUrl: './training.component.html'
})
export class TrainingComponent {
  $exercises: Signal<ReadonlyArray<Exercise>> = this.store.selectSignal(selectExercises);

  constructor(private readonly store: Store) {}
}
