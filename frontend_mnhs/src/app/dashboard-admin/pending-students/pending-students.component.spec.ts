import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingStudentsComponent } from './pending-students.component';

describe('PendingStudentsComponent', () => {
  let component: PendingStudentsComponent;
  let fixture: ComponentFixture<PendingStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingStudentsComponent]
    });
    fixture = TestBed.createComponent(PendingStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
