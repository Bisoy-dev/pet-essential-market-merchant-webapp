import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDeliverOrderComponent } from './to-deliver-order.component';

describe('ToDeliverOrderComponent', () => {
  let component: ToDeliverOrderComponent;
  let fixture: ComponentFixture<ToDeliverOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDeliverOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDeliverOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
