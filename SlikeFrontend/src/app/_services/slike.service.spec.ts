import { TestBed } from '@angular/core/testing';

import { SlikeService } from './slike.service';

describe('SlikeService', () => {
  let service: SlikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
