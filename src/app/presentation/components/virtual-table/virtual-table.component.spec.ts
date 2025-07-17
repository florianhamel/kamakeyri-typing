import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTableComponent } from './virtual-table.component';

describe('VirtualTableComponent', () => {
  let component: VirtualTableComponent<any>;
  let fixture: ComponentFixture<VirtualTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
