import { logging } from 'protractor';
import { Operacao } from 'src/app/core/models/operacao.model';
import { PlanoFabrico } from './plano-fabrico.model';

export class Produto {
    Id: string;
    nomeProduto: string;
    descricaoProduto: string;
    planofabrico: PlanoFabrico;

    constructor(id: string, nomeProduto: string, descricaoProduto: string, id_plano_fabrico: string, operacoes: string[]) {
        this.Id = id;
        this.nomeProduto = nomeProduto;
        this.descricaoProduto = descricaoProduto;
        this.planofabrico = new PlanoFabrico(id_plano_fabrico, id, operacoes);
    }
}