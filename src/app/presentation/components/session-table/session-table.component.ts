import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { SessionService } from '../../../application/services/session.service';
import { Session } from '../../../domain/types/session.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { VirtualTableComponent } from '../virtual-table/virtual-table.component';

@Component({
  selector: 'kw-session-table',
  imports: [CdkTableModule, AsyncPipe, VirtualTableComponent],
  templateUrl: './session-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTableComponent {
  protected readonly headers: ReadonlyArray<string>;
  protected readonly sessions$: Observable<ReadonlyArray<Session>>;

  constructor(private readonly sessionService: SessionService) {
    this.headers = ['Time', 'Length', 'Keystrokes', 'Errors', 'Mode', 'Label', 'Option', 'Language'];
    this.sessions$ = this.sessionService.getSessions();
  }
}
