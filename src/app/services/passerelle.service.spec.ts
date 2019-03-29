import { TestBed } from '@angular/core/testing';

import { PasserelleService } from './passerelle.service';

describe('PasserelleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasserelleService = TestBed.get(PasserelleService);
    expect(service).toBeTruthy();
  });
});
