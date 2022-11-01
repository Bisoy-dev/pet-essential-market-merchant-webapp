import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDeliverComponent } from './to-deliver.component';

describe('ToDeliverComponent', () => {
  let component: ToDeliverComponent;
  let fixture: ComponentFixture<ToDeliverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDeliverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
