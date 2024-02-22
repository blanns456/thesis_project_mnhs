import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShsEnrollmentComponent } from './shs-enrollment.component';

describe('ShsEnrollmentComponent', () => {
  let component: ShsEnrollmentComponent;
  let fixture: ComponentFixture<ShsEnrollmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShsEnrollmentComponent]
    });
    fixture = TestBed.createComponent(ShsEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
