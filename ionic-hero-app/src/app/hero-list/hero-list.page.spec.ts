import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListPage } from './hero-list.page';

describe('HeroListPage', () => {
  let component: HeroListPage;
  let fixture: ComponentFixture<HeroListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
