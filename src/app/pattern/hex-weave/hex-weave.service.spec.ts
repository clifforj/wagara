import { TestBed } from '@angular/core/testing';

import { HexWeaveService } from './hex-weave.service';

describe('HexWeaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HexWeaveService = TestBed.get(HexWeaveService);
    expect(service).toBeTruthy();
  });
});
