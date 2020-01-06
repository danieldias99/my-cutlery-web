import { expect } from 'chai';
import { Config } from '../../src/app/core/models/config.model';

let role: String = "chefe";
let resourse: String = "11";
let permissionsArray = new Array();
permissionsArray.push('permissions');
let configObj = new Config(role, resourse, permissionsArray);

it('Config Test', () => {
        expect(configObj.role).to.eq('chefe');
        expect(configObj.resourse).to.eq('11');
        expect(configObj.permissions).to.eq(permissionsArray);
        expect(configObj.permissions[0]).to.eq('permissions');
    })
