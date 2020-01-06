import { Maquina } from '../../src/app/core/models/maquina.model';
import { expect } from 'chai';

// Maquina
let idMaq: number = 1;
let nomeMaquina: string = 'maquinaTest';
let marcaMaquina: string = 'marcaMaquina';
let modeloMaquina: string = 'modeloMaquina';
let xMaquina: string = 'xMaquina';
let yMaquina: string = 'yMaquina';
let posicaoRelativa: string = 'posicaoMaquina';
let idTipoMaq: string = '2';
let idLinhaProd: string = '3';
let estado: boolean = true;
let maquinaObj = new Maquina(idMaq, nomeMaquina, marcaMaquina, modeloMaquina, xMaquina, yMaquina, posicaoRelativa, idTipoMaq, idLinhaProd, estado);

it('Maquina Test', () => {
    expect(maquinaObj.id).to.eq(1);
    expect(maquinaObj.nomeMaquina).to.eq('maquinaTest');
    expect(maquinaObj.marcaMaquina).to.eq('marcaMaquina');
    expect(maquinaObj.modeloMaquina).to.eq('modeloMaquina');
    expect(maquinaObj.x).to.eq('xMaquina');
    expect(maquinaObj.y).to.eq('yMaquina');
    expect(maquinaObj.posicaoRelativa).to.eq('posicaoMaquina');
    expect(maquinaObj.id_linhaProducao).to.eq('3');
    expect(maquinaObj.id_tipoMaquina).to.eq('2');
    expect(maquinaObj.estado).to.eq(true);

})
