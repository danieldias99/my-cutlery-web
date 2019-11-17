export class Produto {
    id: string;
    nomeProduto: string;
    descricaoProduto: string;

    constructor(id: string, nomeProduto: string, descricaoProduto: string) {
        this.id = id;
        this.nomeProduto = nomeProduto;
        this.descricaoProduto = descricaoProduto;
    }
}