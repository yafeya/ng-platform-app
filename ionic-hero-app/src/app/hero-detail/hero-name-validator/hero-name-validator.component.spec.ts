import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroNameValidatorComponent } from './hero-name-validator.component';

describe('HeroNameValidatorComponent', () => {
  let component: HeroNameValidatorComponent;
  let fixture: ComponentFixture<HeroNameValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroNameValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroNameValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
