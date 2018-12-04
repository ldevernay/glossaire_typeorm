import { expect } from 'chai';
import { createConnection } from 'typeorm';
import User from '../src/entity/User';
import Word from '../src/entity/Word';

describe('Word CRUD', () => {
    
    let connection;
    let james;

    before(async () => {
        connection = await createConnection();
        james = new User();
        james.name = "James";
        await james.save();
    });

    it('properly creates the word', async () => {
            const word = new Word();
            word.name = "Toto";
            word.definition = "0+0"
            word.owner = james;
            await word.save();

            let result = await Word.findOne({name: "Toto"});
            if (result){
                expect(result).to.exist;
            }
    });

    it('successfully updates a given word', async () => {
            const toto = await Word.findOne({name: "Toto"});
            toto.definition = "1+1";
            await toto.save();

            let result = await Word.findOne({name: "Toto"});
            if (result){
                expect(result.definition).to.equal("1+1");
            }
    });

    it('successfully removes a given word', async () => {
            const toto = await Word.findOne({name: "Toto"});
            await toto.remove();

            let result = await Word.findOne({name: "Toto"});
            if (result){
                expect(result).not.to.exist;
            }
    });

    after(async () => {
        let james = await User.findOne({name: "James"});
        await james.remove();
        await connection.close();
    })
});