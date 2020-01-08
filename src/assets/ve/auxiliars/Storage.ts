import { Product } from './Product';
import { LinhaProducao } from 'src/app/core/models/linha-producao';

export class Storage {

    tipo: String;
    mesh: any;
    linhaMesh: any;
    linha: LinhaProducao;
    id_linha: string;
    inside: Product[];

    constructor(tipo: String, mesh: any, linhaMesh: any, linha: LinhaProducao) {
        this.tipo = tipo;
        this.mesh = mesh;
        this.linhaMesh = linhaMesh;
        this.linha = linha;
        this.id_linha = linha.id;
        this.inside = new Array();
    }

    addToBox(product: Product) {
        this.inside.push(product);
    }

}