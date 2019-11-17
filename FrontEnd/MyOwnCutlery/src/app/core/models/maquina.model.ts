export class Maquina {
    id: number;
    nomeMaquina: string;
    posicaoLinhaProducao: string;
    id_tipoMaquina: string;

    constructor(id: number, nomeMaquina: string, posicaoLinhaProducao: string, id_tipoMaquina: string) {
        this.id = id;
        this.nomeMaquina = nomeMaquina;
        this.posicaoLinhaProducao = posicaoLinhaProducao;
        this.id_tipoMaquina = id_tipoMaquina;
    }
}