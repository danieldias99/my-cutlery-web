import { Operacao } from 'src/app/core/models/operacao.model';

export class PlanoFabrico {
    Id: string;
    Id_produto: string;
    operacoes: string[];
    tempo_fabrico: number;

    constructor(id: string, Id_produto: string, operacoes: string[], tempo_fabrico: number) {
        this.Id = id;
        this.Id_produto = Id_produto;
        this.operacoes = operacoes;
        this.tempo_fabrico = tempo_fabrico;
    }
}