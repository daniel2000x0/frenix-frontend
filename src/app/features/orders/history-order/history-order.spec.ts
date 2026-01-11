import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrder } from './history-order';

describe('HistoryOrder', () => {
  let component: HistoryOrder;
  let fixture: ComponentFixture<HistoryOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
