import { TestBed } from '@angular/core/testing';

import { DirectorServiceService } from './director-service.service';

describe('DirectorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectorServiceService = TestBed.get(DirectorServiceService);
    expect(service).toBeTruthy();
  });
});
