import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToRecieveComponent } from './to-recieve.component';

describe('ToRecieveComponent', () => {
  let component: ToRecieveComponent;
  let fixture: ComponentFixture<ToRecieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToRecieveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
