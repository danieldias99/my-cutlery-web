import { expect } from 'chai';
import { Operacao } from '../../src/app/core/models/operacao.model';

let id: string = '123';
let descricao: string = 'goncalo';
let duracao: string = 'duracao';
let id_ferramenta: string = 'talher';
let duracaoFerramenta: string = '20';
let operacaoObj = new Operacao(id, descricao, duracao, id_ferramenta, duracaoFerramenta);

it('Operação Test', () => {
    expect(operacaoObj.id).to.eq('123');
    expect(operacaoObj.descricaoOperacao).to.eq('goncalo');
    expect(operacaoObj.duracaoOperacao).to.eq('duracao');
    expect(operacaoObj.id_ferramenta).to.eq('talher');
    expect(operacaoObj.duracaoFerramenta).to.eq('20');
})
