import { TestBed } from '@angular/core/testing';

import { EncomendaService } from './encomenda.service';

describe('EncomendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncomendaService = TestBed.get(EncomendaService);
    expect(service).toBeTruthy();
  });
});
