import { expect } from 'chai';
import { createConnection } from 'typeorm';
import User from '../src/entity/User';
import { create } from 'domain';

describe('User CRUD', () => {
    it('properly creates the user', () => {
        createConnection().then (async connection => {
            console.log(await User.find());
        })
    })
})