import { expect } from 'chai';
import { EncriptPackage } from '../src/app/core/models/EncriptPackage';

let email: String = 'goncalo@goncalo';
let password: String = 'pwtest';

it('encryptionTest', () => {
    let encryptionTestOBJ = new EncriptPackage(email, password);
    expect(encryptionTestOBJ.email).to.eq('goncalo@goncalo');
    expect(encryptionTestOBJ.password).to.eq('pwtest');
})
