import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherEmergenciesPage } from './other-emergencies.page';

describe('OtherEmergenciesPage', () => {
  let component: OtherEmergenciesPage;
  let fixture: ComponentFixture<OtherEmergenciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherEmergenciesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherEmergenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
