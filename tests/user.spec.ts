import { expect } from 'chai';
import { createConnection } from 'typeorm';
import User from '../src/entity/User';

describe('User CRUD', () => {
    it('properly creates the user', async () => {
        return createConnection().then(async connection => {
            const user = new User();
            user.name = "Bobby";
            await user.save();

            let result = await User.find({name: "Bobby"});
            if (result){
                expect(result.length).to.be.greaterThan(0);
            }
        });
    })
})