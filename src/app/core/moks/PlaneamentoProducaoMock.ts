import { TarefaMock } from './TarefaMock';

export class PlaneamentoProducaoMock {

    tarefas: TarefaMock[];

    constructor() {
        this.tarefas = new Array();

        //P1
        this.tarefas.push(new TarefaMock('1', '1', 1, 'Furadora Mecanica', 'Colher', 10, 3, false));
        this.tarefas.push(new TarefaMock('1', '2', 3, 'Prensa Quadrada', 'Colher', 10, 4, false));
        this.tarefas.push(new TarefaMock('1', '3', 5, 'Aquecedor', 'Colher', 10, 5, true));

        this.tarefas.push(new TarefaMock('1', '1', 1, 'Furadora Mecanica', 'Colher', 10, 3, false));
        this.tarefas.push(new TarefaMock('1', '2', 3, 'Prensa Quadrada', 'Colher', 10, 4, false));
        this.tarefas.push(new TarefaMock('1', '3', 5, 'Aquecedor', 'Colher', 10, 5, true));

        this.tarefas.push(new TarefaMock('1', '1', 1, 'Furadora Mecanica', 'Colher', 10, 3, false));
        this.tarefas.push(new TarefaMock('1', '2', 3, 'Prensa Quadrada', 'Colher', 10, 4, false));
        this.tarefas.push(new TarefaMock('1', '3', 5, 'Aquecedor', 'Colher', 10, 5, true));

        
        //P2
        this.tarefas.push(new TarefaMock('2', '3', 5, 'Aquecedor', 'Faca', 10, 3, false));
        this.tarefas.push(new TarefaMock('2', '2', 3, 'Prensa Quadrada', 'Faca', 10, 6, false));
        this.tarefas.push(new TarefaMock('2', '1', 1, 'Furadora Mecanica', 'Faca', 10, 2, true));

        this.tarefas.push(new TarefaMock('2', '3', 5, 'Aquecedor', 'Faca', 10, 3, false));
        this.tarefas.push(new TarefaMock('2', '2', 3, 'Prensa Quadrada', 'Faca', 10, 6, false));
        this.tarefas.push(new TarefaMock('2', '1', 1, 'Furadora Mecanica', 'Faca', 10, 2, true));
        
        //P3
        this.tarefas.push(new TarefaMock('3', '2', 5, 'Prensa Quadrada', 'Garfo', 10, 5, false));
        this.tarefas.push(new TarefaMock('3', '1', 3, 'Furadora Mecanica', 'Garfo', 10, 4, false));
        this.tarefas.push(new TarefaMock('3', '3', 1, 'Aquecedor', 'Garfo', 10, 3, true));

        this.tarefas.push(new TarefaMock('3', '2', 5, 'Prensa Quadrada', 'Garfo', 10, 5, false));
        this.tarefas.push(new TarefaMock('3', '1', 3, 'Furadora Mecanica', 'Garfo', 10, 4, false));
        this.tarefas.push(new TarefaMock('3', '3', 1, 'Aquecedor', 'Garfo', 10, 3, true));
    }

}