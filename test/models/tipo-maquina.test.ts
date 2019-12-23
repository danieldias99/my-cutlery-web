import { expect } from 'chai';
import { Operacao } from '../../src/app/core/models/operacao.model';
import { TipoMaquina } from '../../src/app/core/models/tipo-maquina.model';

// Operação
let id: string = '123';
let descricao: string = 'goncalo';
let duracao: string = 'duracao';
let operacaoObj = new Operacao(id, descricao, duracao);

// Array Operação
let operacaoArray = new Array();
operacaoArray.push(operacaoObj);

// TipoMaquina
let maqId: string = '123';
let descricaoMaquina: string = 'tipoMaquina';
let tipoMaquinaObj = new TipoMaquina(maqId, descricaoMaquina, operacaoArray);


it('Tipo de Maquina Test', () => {
    expect(tipoMaquinaObj.id_tipoMaquina).to.eq('123');
    expect(tipoMaquinaObj.descricaoTipoMaquina).to.eq('tipoMaquina');
    expect(tipoMaquinaObj.operacoes).to.eq(operacaoArray);
})
