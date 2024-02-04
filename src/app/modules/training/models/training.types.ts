export type Level = 'easy' | 'medium' | 'hard';

export type Exercise = {
  label: string;
  content: string;
  level: Level;
}

export type TrainingState = {
  exercises: ReadonlyArray<Exercise>;
  isLoading: boolean;
}
