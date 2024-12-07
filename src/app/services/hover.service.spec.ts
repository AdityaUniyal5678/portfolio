import { TestBed } from '@angular/core/testing';

import { CursorHoverService } from './cursorhover.service';

describe('HoverService', () => {
  let service: CursorHoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursorHoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
