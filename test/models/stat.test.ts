import { expect } from 'chai';
import { Stat } from '../../src/app/core/models/stat.model';

let nomeProduto: String = 'nomeTest';
let stati: number = 1;
let statObj = new Stat(nomeProduto, stati);

it('Stat test', () => {
        expect(statObj.nomeProduto).to.eq('nomeTest');
        expect(statObj.stati).to.eq(1);
    })
