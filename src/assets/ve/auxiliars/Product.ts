import { Maquina } from 'src/app/core/models/maquina.model';
import { LinhaProducao } from 'src/app/core/models/linha-producao';
import { TarefaMock } from 'src/app/core/moks/TarefaMock';

export class Product {

    tag: String;
    mesh: any;
    maquina: Maquina;
    linha: LinhaProducao;
    tarefa: TarefaMock;
    tempo_exec: number;
    x: number;
    y: number;
    z: number;

    constructor(tag: String, mesh: any, tempo_exec: number, x: number, y: number, z: number, maquina: Maquina, linha: LinhaProducao, tarefa: TarefaMock) {
        this.tag = tag;
        this.mesh = mesh;
        this.tempo_exec = tempo_exec;
        this.x = x;
        this.y = y;
        this.z = z;
        this.maquina = maquina;
        this.linha = linha;
        this.tarefa = tarefa;
    }
}