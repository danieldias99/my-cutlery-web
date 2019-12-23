import { expect } from 'chai';
import { ProdutoEncomenda } from '../../src/app/core/models/produto-encomenda';

// Attributes for Produto Encomenda
let nomeProduto: String = "talheres";
let quatidade: String = "20"
let produtoObj = new ProdutoEncomenda(nomeProduto, quatidade);

it('Produto-Encomenda Test', () => {
        expect(produtoObj.nomeProduto).to.eq(nomeProduto);
        expect(produtoObj.quantidade).to.eq(quatidade);
    })
