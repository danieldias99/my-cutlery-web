export class Maquina {
    id: number;
    nomeMaquina: string;
    marcaMaquina: string;
    modeloMaquina: string;
    x: string;
    y: string;
    posicaoRelativa: string;
    id_tipoMaquina: string;
    id_linhaProducao: string;

    constructor(id: number, nomeMaquina: string, marcaMaquina: string, modeloMaquina: string, x: string, y: string, posicaoRelativa: string, id_tipoMaquina: string, id_linhaProducao: string) {
        this.id = id;
        this.nomeMaquina = nomeMaquina;
        this.marcaMaquina = marcaMaquina;
        this.modeloMaquina = modeloMaquina;
        this.x = x;
        this.y = y;
        this.posicaoRelativa = posicaoRelativa;
        this.id_tipoMaquina = id_tipoMaquina;
        this.id_linhaProducao = id_linhaProducao;
    }
}