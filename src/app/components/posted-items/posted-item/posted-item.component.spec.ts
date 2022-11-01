import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedItemComponent } from './posted-item.component';

describe('PostedItemComponent', () => {
  let component: PostedItemComponent;
  let fixture: ComponentFixture<PostedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
