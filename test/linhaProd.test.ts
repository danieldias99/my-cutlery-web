import { expect } from 'chai';
import { LinhaProducao } from '../src/app/core/models/linha-producao';

// Linha de producao
let id: string = '123';
let descricao: string = 'descricao';
let posicao_x: string = '123';
let posicao_y: string = '123';
let orientacao: string = 'vertical';
let comprimento: string = 'comprimento';
let largura: string = 'largura';
let linhaProdObj = new LinhaProducao(id, descricao, posicao_x, posicao_y, orientacao, comprimento, largura);


it('linhaProdTest', () => {
    expect(linhaProdObj.id).to.eq('123');
    expect(linhaProdObj.descricao).to.eq('descricao');
    expect(linhaProdObj.posicao_x).to.eq('123');
    expect(linhaProdObj.posicao_y).to.eq('123');
    expect(linhaProdObj.orientacao).to.eq('vertical');
    expect(linhaProdObj.comprimento).to.eq('comprimento');
    expect(linhaProdObj.largura).to.eq('largura');
})
