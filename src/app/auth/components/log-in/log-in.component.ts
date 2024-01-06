import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../common/types';
import { authActions } from '../../store/auth.actions';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html'
})
export class LogInComponent {
  logInForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly authStore: Store<AuthState>) {}

  handleSubmission(): void {
    this.authStore.dispatch(
      authActions.logIn({
        username: this.logInForm.value.username,
        password: this.logInForm.value.password
      })
    );
  }
}
