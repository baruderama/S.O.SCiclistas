import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFindPage } from './admin-find.page';

describe('AdminFindPage', () => {
  let component: AdminFindPage;
  let fixture: ComponentFixture<AdminFindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFindPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
