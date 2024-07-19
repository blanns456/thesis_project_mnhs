import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearSettingsComponent } from './school-year-settings.component';

describe('SchoolYearSettingsComponent', () => {
  let component: SchoolYearSettingsComponent;
  let fixture: ComponentFixture<SchoolYearSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolYearSettingsComponent]
    });
    fixture = TestBed.createComponent(SchoolYearSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
