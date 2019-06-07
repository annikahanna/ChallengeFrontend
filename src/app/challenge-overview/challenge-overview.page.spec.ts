import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeOverviewPage } from './challenge-overview';

describe('ChallengeOverviewPage', () => {
  let component: ChallengeOverviewPage;
  let fixture: ComponentFixture<ChallengeOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeOverviewPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
