import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTableComponent } from './session-table.component';
import { SessionService } from '../../../application/services/session.service';
import { provideHttpClient } from '@angular/common/http';

describe('SessionTableComponent', () => {
  let component: SessionTableComponent;
  let fixture: ComponentFixture<SessionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTableComponent],
      providers: [SessionService, provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
