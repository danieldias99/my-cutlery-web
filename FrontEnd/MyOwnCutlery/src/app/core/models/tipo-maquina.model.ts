import { TiposMaquinaOperacao } from './tipos-maquina-operacao.model';
import { Operacao } from './operacao.model';

export class TipoMaquina {
    id_tipoMaquina: string;
    descricaoTipoMaquina: string;
    operacoesAss: Operacao[];

    constructor(id_tipoMaquina: string, descricao: string, operacoesMaquina: Operacao[]) {
        this.id_tipoMaquina = id_tipoMaquina;
        this.descricaoTipoMaquina = descricao;
        this.operacoesAss = operacoesMaquina;
        //this.addOperacoes(operacoesMaquina);
    }

    /*addOperacoes(operacoesMaquina: Operacao[]) {
        this.operacoesAss = new Array;
        operacoesMaquina.forEach(element => {
            this.operacoesAss.push(new TiposMaquinaOperacao(element.id, this.id_tipoMaquina))
        });
    }*/
}