export class Operacao {
    Id: string;
    descricaoOperacao: string;
    duracaoOperacao: string;

    constructor(id: string, descricao: string, duracao: string) {
        this.Id = id;
        this.descricaoOperacao = descricao;
        this.duracaoOperacao = duracao
    }
}