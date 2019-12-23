import { expect } from 'chai';
import { Operacao } from '../../src/app/core/models/operacao.model';
import { PlanoFabrico } from '../../src/app/core/models/plano-fabrico.model';

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

it('Plano-Fabrico Test', () => {
    expect(planoFabricoObj.Id).to.eq('123');
    expect(planoFabricoObj.Id_produto).to.eq('1234');
    expect(planoFabricoObj.operacoes).to.eq(operacaoArray);
    expect(planoFabricoObj.tempo_fabrico).to.eq(2);
})
