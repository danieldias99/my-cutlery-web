import { Utilizador } from './utilizador';

export class Cliente extends Utilizador {

    nr_telemovel: String;
    metodo_pagamento: String;
    modo_entrega: String;
    morada: String;
    cod_postal: String;
    isAdmin: Boolean;

    constructor(nr_idCivil: String, nome: String, email: String, password: String, nr_telemovel: String, metodo_pagamento: String, modo_entrega: String, morada: String, cod_postal: String) {
        super(nr_idCivil, nome, email, password);
        this.nr_telemovel = nr_telemovel;
        this.metodo_pagamento = metodo_pagamento;
        this.modo_entrega = modo_entrega;
        this.morada = morada;
        this.cod_postal = cod_postal;
        this.isAdmin = false;
    }
}