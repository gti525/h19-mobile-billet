import { TestBed } from '@angular/core/testing';

import { PathprotectionService } from './pathprotection.service';

describe('PathprotectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PathprotectionService = TestBed.get(PathprotectionService);
    expect(service).toBeTruthy();
  });
});
