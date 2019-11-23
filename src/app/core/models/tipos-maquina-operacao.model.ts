export class TiposMaquinaOperacao {
    Id: string;
    id_tipoMaquina: string;

    constructor(id_operacao: string, id_tipoMaquina: string) {
        this.Id = id_operacao;
        this.id_tipoMaquina = id_tipoMaquina;
    }
}