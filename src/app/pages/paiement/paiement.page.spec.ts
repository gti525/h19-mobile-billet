import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementPage } from './paiement.page';

describe('PaiementPage', () => {
  let component: PaiementPage;
  let fixture: ComponentFixture<PaiementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
