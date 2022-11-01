import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPackComponent } from './to-pack.component';

describe('ToPackComponent', () => {
  let component: ToPackComponent;
  let fixture: ComponentFixture<ToPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
