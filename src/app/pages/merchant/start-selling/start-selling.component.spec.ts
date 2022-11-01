import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSellingComponent } from './start-selling.component';

describe('StartSellingComponent', () => {
  let component: StartSellingComponent;
  let fixture: ComponentFixture<StartSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSellingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
