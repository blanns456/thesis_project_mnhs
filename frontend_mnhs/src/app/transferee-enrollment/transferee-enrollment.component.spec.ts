import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfereeEnrollmentComponent } from './transferee-enrollment.component';

describe('TransfereeEnrollmentComponent', () => {
  let component: TransfereeEnrollmentComponent;
  let fixture: ComponentFixture<TransfereeEnrollmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfereeEnrollmentComponent]
    });
    fixture = TestBed.createComponent(TransfereeEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
