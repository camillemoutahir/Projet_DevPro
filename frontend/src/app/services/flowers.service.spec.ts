import { TestBed } from '@angular/core/testing';

import { FlowerService } from './flowers.service';

describe('FlowerService', () => {
  let service: FlowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
