import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineStudentsComponent } from './decline-students.component';

describe('DeclineStudentsComponent', () => {
  let component: DeclineStudentsComponent;
  let fixture: ComponentFixture<DeclineStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclineStudentsComponent]
    });
    fixture = TestBed.createComponent(DeclineStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
