import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenciesPage } from './emergencies.page';

describe('EmergenciesPage', () => {
  let component: EmergenciesPage;
  let fixture: ComponentFixture<EmergenciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenciesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
