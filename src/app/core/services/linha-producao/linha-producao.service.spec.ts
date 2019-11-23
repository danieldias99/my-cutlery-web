import { TestBed } from '@angular/core/testing';

import { LinhaProducaoService } from './linha-producao.service';

describe('LinhaProducaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinhaProducaoService = TestBed.get(LinhaProducaoService);
    expect(service).toBeTruthy();
  });
});
