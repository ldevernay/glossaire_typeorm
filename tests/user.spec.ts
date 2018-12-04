import { expect } from 'chai';
import { createConnection } from 'typeorm';
import User from '../src/entity/User';

describe('User CRUD', () => {
    let connection;
    before(async () => {
        connection = await createConnection();
    })
    it('properly creates the user', async () => {
            const user = new User();
            user.name = "Bobby";
            await user.save();

            let result = await User.findOne({name: "Bobby"});
            if (result){
                expect(result).to.exist;
            }
    });
    it('successfully updates a given user', async () => {
            const bobby = await User.findOne({name: "Bobby"});
            bobby.name = "John";
            await bobby.save();

            let result = await User.findOne({name: "John"});
            if (result){
                expect(result).to.exist;
            }
    });
    it('successfully removes a given user', async () => {
            const bobby = await User.findOne({name: "John"});
            await bobby.remove();

            let result = await User.findOne({name: "John"});
            if (result){
                expect(result).not.to.exist;
            }
    })

    after(async () => {
        await connection.close();
    })
});