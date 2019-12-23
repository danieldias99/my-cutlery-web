import { expect } from 'chai';
import { TiposMaquinaOperacao } from '../../src/app/core/models/tipos-maquina-operacao.model';

// TiposMaquinaOperacao
let id: string = '1';
let id_tipoMaquina: string = '22';
let tipoMaquinaOperacaoObj = new TiposMaquinaOperacao(id, id_tipoMaquina);

it('Tipos de Maquina de Operação Test', () => {
    expect(tipoMaquinaOperacaoObj.id_tipoMaquina).to.eq('22');
    expect(tipoMaquinaOperacaoObj.Id).to.eq('1');
})
