import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedItemsComponent } from './posted-items.component';

describe('PostedItemsComponent', () => {
  let component: PostedItemsComponent;
  let fixture: ComponentFixture<PostedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
