import { TestBed } from '@angular/core/testing';

import { SanWeaveService } from './san-weave.service';

describe('SanWeaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SanWeaveService = TestBed.get(SanWeaveService);
    expect(service).toBeTruthy();
  });
});
