import { TestBed } from '@angular/core/testing';

import { RequerenteService } from './requerente.service';

describe('RequerenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequerenteService = TestBed.get(RequerenteService);
    expect(service).toBeTruthy();
  });
});
