import { Maquina } from 'src/app/core/models/maquina.model';

export class Machine {

    maquina: Maquina;
    mesh: any;

    constructor(maquina: Maquina, mesh: any) {
        this.maquina = maquina;
        this.mesh = mesh;
    }
}