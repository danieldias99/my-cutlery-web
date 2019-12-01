import { Maquina } from './maquina.model';

export class LinhaProducao {
    id: string;
    descricao: string;
    posicao_x: string;
    posicao_y: string;
    orientacao: string;
    comprimento: string;
    largura: string;
    maquinas: Maquina[];

    constructor(id: string, descricao: string, posicao_x: string, posicao_y: string, orientacao: string, comprimento: string, largura: string) {
        this.id = id;
        this.descricao = descricao;
        this.orientacao = orientacao;
        this.posicao_x = posicao_x;
        this.posicao_y = posicao_y;
        this.comprimento = comprimento;
        this.largura = largura;
    }
}