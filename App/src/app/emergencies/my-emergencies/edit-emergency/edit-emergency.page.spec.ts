import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmergencyPage } from './edit-emergency.page';

describe('EditEmergencyPage', () => {
  let component: EditEmergencyPage;
  let fixture: ComponentFixture<EditEmergencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmergencyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmergencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
