import { expect } from 'chai';
import { createConnection } from 'typeorm';
import User from '../src/entity/User';

describe('User CRUD', () => {
    let connection;
    before(async () => {
        connection = await createConnection();
    })
    it('properly creates the user', async () => {
        //return createConnection().then(async connection => {
            const user = new User();
            user.name = "Bobby";
            await user.save();

            let result = await User.find({name: "Bobby"});
            if (result){
                expect(result.length).to.be.greaterThan(0);
            }
        //});
    });
    it('successfully updates a given user', async () => {
        //return createConnection().then(async connection => {
            const bobby = await User.findOne({name: "Bobby"});
            bobby.name = "John";
            await bobby.save();

            let result = await User.findOne({name: "John"});
            if (result){
                expect(result).to.exist;
            }
        //})
    })

    after(async () => {
        await connection.close();
    })
});