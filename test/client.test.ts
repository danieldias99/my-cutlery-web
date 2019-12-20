import { expect } from 'chai';
import { Cliente } from '../src/app/core/models/cliente';

let nr_idCivil: String = '123456789';
let nome: String = 'goncalo';
let email: String = 'goncalo@goncalo.pt';
let password: String = 'pwtest';
let nr_telemovel: String = '912345678';
let metodo_pagamento: String = 'paypal';
let modo_entrega: String = 'correios';
let morada: String = 'matosas';
let cod_postal: String = '4450';

it('clientTest', () => {
        let clientObj = new Cliente(nr_idCivil, nome, email, password, nr_telemovel, metodo_pagamento, modo_entrega, morada, cod_postal);
        expect(clientObj.nr_idCivil).to.eq('123456789');
        expect(clientObj.nome).to.eq('goncalo');
        expect(clientObj.email).to.eq('goncalo@goncalo.pt');
        expect(clientObj.password).to.eq('pwtest');
        expect(clientObj.nr_telemovel).to.eq('912345678');
        expect(clientObj.metodo_pagamento).to.eq('paypal');
        expect(clientObj.modo_entrega).to.eq('correios');
        expect(clientObj.morada).to.eq('matosas');
        expect(clientObj.cod_postal).to.eq('4450');
    })
