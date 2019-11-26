export class Maquina {
    id: number;
    nomeMaquina: string;
    marcaMaquina: string;
    modeloMaquina: string;
    x: string;
    y: string;
    id_tipoMaquina: string;

    constructor(id: number, nomeMaquina: string, marcaMaquina: string, modeloMaquina: string, x: string, y: string, id_tipoMaquina: string) {
        this.id = id;
        this.nomeMaquina = nomeMaquina;
        this.marcaMaquina = marcaMaquina;
        this.modeloMaquina = modeloMaquina;
        this.x = x;
        this.y = y;
        this.id_tipoMaquina = id_tipoMaquina;
    }
}