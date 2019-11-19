import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPage } from './find.page';

describe('FindPage', () => {
  let component: FindPage;
  let fixture: ComponentFixture<FindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
