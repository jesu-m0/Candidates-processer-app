import { TestBed } from '@angular/core/testing';

import { CandidatesPageService } from './candidates-page.service';

describe('CandidatesPageService', () => {
  let service: CandidatesPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
