
export class TarefaMock {

    linha: string;
    maquina: string;
    operacao: number;
    ferramenta: string;
    produto: string;
    tempo_setup: number;
    tempo_execucao: number;
    lastTask: boolean;

    constructor(linha: string, maquina: string, operacao: number, ferramenta: string, produto: string, tempo_setup: number, tempo_execucao: number, lastTask: boolean) {
        this.linha = linha;
        this.maquina = maquina;
        this.operacao = operacao;
        this.ferramenta = ferramenta;
        this.produto = produto;
        this.tempo_setup = tempo_setup;
        this.tempo_execucao = tempo_execucao;
        this.lastTask = lastTask;
    }
}