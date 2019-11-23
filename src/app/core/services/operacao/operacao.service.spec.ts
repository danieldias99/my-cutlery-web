import { TestBed } from '@angular/core/testing';

import { OperacaoService } from './operacao.service';

describe('OperacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacaoService = TestBed.get(OperacaoService);
    expect(service).toBeTruthy();
  });
});
