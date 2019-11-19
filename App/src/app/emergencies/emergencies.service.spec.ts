import { TestBed } from '@angular/core/testing';

import { EmergenciesService } from './emergencies.service';

describe('EmergenciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmergenciesService = TestBed.get(EmergenciesService);
    expect(service).toBeTruthy();
  });
});
