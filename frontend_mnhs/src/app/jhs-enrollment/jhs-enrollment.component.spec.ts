import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JhsEnrollmentComponent } from './jhs-enrollment.component';

describe('JhsEnrollmentComponent', () => {
  let component: JhsEnrollmentComponent;
  let fixture: ComponentFixture<JhsEnrollmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JhsEnrollmentComponent]
    });
    fixture = TestBed.createComponent(JhsEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
