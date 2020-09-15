import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlikeComponent } from './slike.component';

describe('SlikeComponent', () => {
  let component: SlikeComponent;
  let fixture: ComponentFixture<SlikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
