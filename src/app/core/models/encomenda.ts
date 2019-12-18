import { ProdutoEncomenda } from './produto-encomenda';

export class Encomenda {

    _id: String;
    cliente: String;
    produtos: ProdutoEncomenda[];
    data_entrega: String;
    estado: String;

    constructor(email: String, produtos: ProdutoEncomenda[], data_entrega: String) {
        this.cliente = email;
        this.produtos = produtos;
        this.data_entrega = data_entrega;
    }

}