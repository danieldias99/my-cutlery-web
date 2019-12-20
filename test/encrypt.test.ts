import { expect } from 'chai';
import { EncriptPackage } from '../src/app/core/models/EncriptPackage';

let email: String = 'goncalo@goncalo';
let password: String = 'pwtest';
let encryptionTestOBJ = new EncriptPackage(email, password);

it('encryptionTest', () => {
    expect(encryptionTestOBJ.email).to.eq('goncalo@goncalo');
    expect(encryptionTestOBJ.password).to.eq('pwtest');
})
