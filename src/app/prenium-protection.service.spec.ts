import { TestBed } from '@angular/core/testing';

import { PreniumProtectionService } from './prenium-protection.service';

describe('PreniumProtectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreniumProtectionService = TestBed.get(PreniumProtectionService);
    expect(service).toBeTruthy();
  });
});
