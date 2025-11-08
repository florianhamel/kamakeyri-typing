import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { Session } from '../../../domain/types/session.type';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { VirtualTableComponent } from '../virtual-table/virtual-table.component';
import { SessionRepository } from '../../../domain/repositories/session.repository';

@Component({
  selector: 'kw-session-table',
  imports: [CdkTableModule, AsyncPipe, VirtualTableComponent],
  templateUrl: './session-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTableComponent {
  protected readonly headers: ReadonlyArray<string>;
  protected readonly sessions$: Observable<ReadonlyArray<Session>>;

  constructor(@Inject(SessionRepository) private readonly sessionRepository: SessionRepository) {
    this.headers = ['Time', 'Length', 'Keystrokes', 'Errors', 'Mode', 'Label', 'Option', 'Language'];
    this.sessions$ = this.sessionRepository.findAll();
  }
}
