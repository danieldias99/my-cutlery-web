import { TestBed } from '@angular/core/testing';

import { PlaneamentoProdutoService } from './planeamento-produto.service';

describe('PlaneamentoProdutoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaneamentoProdutoService = TestBed.get(PlaneamentoProdutoService);
    expect(service).toBeTruthy();
  });
});
