
export class TarefaMock {

    linha: string;
    maquina: string;
    operacao: number;
    ferramenta: string;
    produto: number;
    tempo_setup: number;
    tempo_execucao: number;

    constructor(linha: string, maquina: string, operacao: number, ferramenta: string, produto: number, tempo_setup: number, tempo_execucao: number) {
        this.linha = linha;
        this.maquina = maquina;
        this.operacao = operacao;
        this.ferramenta = ferramenta;
        this.produto = produto;
        this.tempo_setup = tempo_setup;
        this.tempo_execucao = tempo_execucao;
    }
}