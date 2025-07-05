import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userActions } from '../../../state/actions/user.actions';
import { ButtonComponent } from '../shared/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, ButtonComponent, TranslateModule],
  templateUrl: './log-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInComponent implements AfterViewInit {
  @ViewChild('usernameInput') usernameInput: ElementRef | undefined;

  logInForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });

  constructor(private readonly store: Store) {}

  ngAfterViewInit(): void {
    this.usernameInput?.nativeElement.focus();
  }

  handleSubmission(): void {
    this.store.dispatch(
      userActions.logIn({
        username: this.logInForm.value.username,
        password: this.logInForm.value.password
      })
    );
  }
}
