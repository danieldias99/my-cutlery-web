import { Operacao } from 'src/app/core/models/operacao.model';

export class PlanoFabrico {
    Id: string;
    Id_produto: string;
    operacoes: string[];

    constructor(id: string, Id_produto: string, operacoes: string[]) {
        this.Id = id;
        this.Id_produto = Id_produto;
        this.operacoes = operacoes;
    }
}