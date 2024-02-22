import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfereeShsEnrollmentComponent } from './transferee-shs-enrollment.component';

describe('TransfereeShsEnrollmentComponent', () => {
  let component: TransfereeShsEnrollmentComponent;
  let fixture: ComponentFixture<TransfereeShsEnrollmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfereeShsEnrollmentComponent]
    });
    fixture = TestBed.createComponent(TransfereeShsEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
