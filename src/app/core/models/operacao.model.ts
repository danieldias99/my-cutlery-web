export class Operacao {
    id: string;
    descricaoOperacao: string;
    duracaoOperacao: string;
    id_ferramenta : string;
    duracaoFerramenta : string;

    constructor(id: string, descricao: string, duracao: string, id_ferramenta : string, duracaoFerramenta : string) {
        this.id = id;
        this.descricaoOperacao = descricao;
        this.duracaoOperacao = duracao
        this.id_ferramenta = id_ferramenta;
        this.duracaoFerramenta = duracaoFerramenta;
    }
}