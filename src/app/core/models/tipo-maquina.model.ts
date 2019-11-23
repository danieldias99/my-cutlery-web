import { TiposMaquinaOperacao } from './tipos-maquina-operacao.model';
import { Operacao } from './operacao.model';

export class TipoMaquina {
    id_tipoMaquina: string;
    descricaoTipoMaquina: string;
    operacoes: Operacao[];

    constructor(id_tipoMaquina: string, descricao: string, operacoesMaquina: Operacao[]) {
        this.id_tipoMaquina = id_tipoMaquina;
        this.descricaoTipoMaquina = descricao;
        this.operacoes = operacoesMaquina;
    }
}