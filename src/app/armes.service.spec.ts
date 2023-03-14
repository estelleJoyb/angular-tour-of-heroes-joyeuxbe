import { TestBed } from '@angular/core/testing';

import { ArmesService } from './armes.service';

describe('ArmesService', () => {
  let service: ArmesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
