export class Operacao {
    id: string;
    descricaoOperacao: string;
    duracaoOperacao: string;

    constructor(id: string, descricao: string, duracao: string) {
        this.id = id;
        this.descricaoOperacao = descricao;
        this.duracaoOperacao = duracao
    }
}