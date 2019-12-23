import { expect } from 'chai';
import { Operacao } from '../../src/app/core/models/operacao.model';
import { PlanoFabrico } from '../../src/app/core/models/plano-fabrico.model';
import { Produto } from '../../src/app/core/models/produto.model';

// Operação
let id: string = '123';
let descricao: string = 'goncalo';
let duracao: string = 'duracao';
let operacaoObj = new Operacao(id, descricao, duracao);

// Array Operação
let operacaoArray = new Array();
operacaoArray.push(operacaoObj);

// Plano Fabrico
let planoID: string = '123';
let Id_produto: string = '1234';
let tempo_fabrico: number = 2;
let planoFabricoObj = new PlanoFabrico(planoID, Id_produto, operacaoArray, tempo_fabrico);

// Produto
let Id: string = '123';
let nomeProduto: string = 'talher';
let descricaoProduto: string = 'metal';
let produtoObj = new Produto(Id, nomeProduto, descricaoProduto, planoID, operacaoArray, tempo_fabrico);

it('Plano-Fabrico Test', () => {
    expect(produtoObj.Id).to.eq('123');
    expect(produtoObj.nomeProduto).to.eq('talher');
    expect(produtoObj.descricaoProduto).to.eq('metal');
    expect(produtoObj.planofabrico.Id).to.eq('123');
    expect(produtoObj.planofabrico.Id_produto).to.eq('123');
    expect(produtoObj.planofabrico.tempo_fabrico).to.eq(2);
    expect(produtoObj.planofabrico.operacoes).to.eq(operacaoArray);
})
