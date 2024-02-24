import { AfterViewInit, Component, effect, ElementRef, Signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth.actions';
import { selectIsLoggedIn } from '../../store/auth.selectors';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html'
})
export class LogInComponent implements AfterViewInit {
  @ViewChild('usernameInput') usernameInput: ElementRef | undefined;

  logInForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });

  $isLoggedIn: Signal<boolean> = this.store.selectSignal(selectIsLoggedIn);

  constructor(
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<LogInComponent>
  ) {
    effect(() => {
      if (this.$isLoggedIn()) {
        this.dialogRef.close();
      }
    });
  }

  ngAfterViewInit(): void {
    this.usernameInput?.nativeElement.focus();
  }

  handleSubmission(): void {
    this.store.dispatch(
      authActions.logIn({
        username: this.logInForm.value.username,
        password: this.logInForm.value.password
      })
    );
  }
}
