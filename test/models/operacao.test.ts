import { expect } from 'chai';
import { Operacao } from '../../src/app/core/models/operacao.model';

let id: string = '123';
let descricao: string = 'goncalo';
let duracao: string = 'duracao';
let operacaoObj = new Operacao(id, descricao, duracao);

it('Operação Test', () => {
    expect(operacaoObj.id).to.eq('123');
    expect(operacaoObj.descricaoOperacao).to.eq('goncalo');
    expect(operacaoObj.duracaoOperacao).to.eq('duracao');
})
