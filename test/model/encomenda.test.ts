import { expect } from 'chai';
import { Encomenda } from '../../src/app/core/models/encomenda';
import { ProdutoEncomenda } from '../../src/app/core/models/produto-encomenda';

// Attributes for Produto Encomenda
let nomeProduto: String = "talheres";
let quatidade: String = "20"
let produtoObj = new ProdutoEncomenda(nomeProduto, quatidade);

// Produto Encomenda Array
let produtosArray = new Array();
produtosArray.push(produtoObj);

// Attributes for encomenda
let data_entrega: String = '12/12/2012';
let email: String = 'goncalo@goncalo.pt';
let encomendaObj = new Encomenda(email, produtosArray, data_entrega);


it('Encomenda Test', () => {
        expect(encomendaObj.cliente).to.eq(email);
        expect(encomendaObj.produtos).to.eq(produtosArray);
        expect(encomendaObj.data_entrega).to.eq(data_entrega);
    })
