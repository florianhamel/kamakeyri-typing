import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SESSION_REPOSITORY } from '../../../domain/repositories/session.repository';
import { SessionHttpRepository } from '../../../core/http/session-http.repository';
import { SessionTableComponent } from './session-table.component';

describe('SessionTableComponent', () => {
  let component: SessionTableComponent;
  let fixture: ComponentFixture<SessionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTableComponent],
      providers: [SessionHttpRepository, { provide: SESSION_REPOSITORY, useExisting: SessionHttpRepository }, provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
