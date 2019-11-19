import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEmergenciesPage } from './my-emergencies.page';

describe('MyEmergenciesPage', () => {
  let component: MyEmergenciesPage;
  let fixture: ComponentFixture<MyEmergenciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEmergenciesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEmergenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
