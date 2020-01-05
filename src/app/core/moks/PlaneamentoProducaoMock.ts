import { TarefaMock } from './TarefaMock';

export class PlaneamentoProducaoMock {

    tarefas: TarefaMock[];

    constructor() {
        this.tarefas = new Array();
        //Produto P1 - Colher, Quantidade 5
        /*this.tarefas.push(new TarefaMock('1', '1', 1, 'Furadora Mecanica', 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '2', 3, 'Prensa Quadrada', 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '3', 5, 'Aquecedor', 1, 10, 15));*/

        this.tarefas.push(new TarefaMock('1', '1', 1, 'Furadora Mecanica', 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '2', 3, 'Prensa Quadrada', 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '3', 5, 'Aquecedor', 1, 10, 15));

        /*this.tarefas.push(new TarefaMock('1', '1', 1, 1, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '2', 3, 3, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '3', 5, 5, 1, 10, 15));

        this.tarefas.push(new TarefaMock('1', '1', 1, 1, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '2', 3, 3, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '3', 5, 5, 1, 10, 15));

        this.tarefas.push(new TarefaMock('1', '1', 1, 1, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '2', 3, 3, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '3', 5, 5, 1, 10, 15));

        this.tarefas.push(new TarefaMock('1', '1', 1, 1, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '2', 3, 3, 1, 10, 15));
        this.tarefas.push(new TarefaMock('1', '3', 5, 5, 1, 10, 15));*/
    }

}