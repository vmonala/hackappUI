import { TestBed } from '@angular/core/testing';

import { IdeaResponseService } from './idea-response.service';

describe('IdeaResponseService', () => {
  let service: IdeaResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeaResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
