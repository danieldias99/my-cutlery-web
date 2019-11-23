import { Maquina } from './maquina.model';

export class LinhaProducao {
    id: string;
    maquinas: Maquina[];

    constructor(id: string, maquinas: Maquina[]) {
        this.id = id;
        this.maquinas = maquinas;
    }
}