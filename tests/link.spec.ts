import { expect } from 'chai';
import { createConnection } from 'typeorm';
import User from '../src/entity/User';
import Word from '../src/entity/Word';
import Link from '../src/entity/Link';

describe('Link CRUD', () => {
    let connection;
    let zelda;
    let word;

    before(async () => {
        connection = await createConnection();

        zelda = new User();
        zelda.name = "Zelda";
        await zelda.save();

        word = new Word();
        word.name = "Browser";
        word.definition = "Search and thou shall find"
        word.owner = zelda;
        await word.save();
    });

    it('properly creates the link', async () => {
        const link = new Link();
        link.url = "https://www.google.com";
        link.description = "Privacy sold separately";
        link.word = word;
        await link.save();

        let result = await Link.findOne({url: "https://www.google.com"});
        if (result){
            expect(result).to.exist;
        }

        let parent = await Word.findOne({name: "Browser"}, {relations: ["links"]});
        expect(parent.links.length).to.be.greaterThan(0);
    });

    it('successfully updates a given link', async () => {
        const google = await Link.findOne({url: "https://www.google.com"});
        google.url = "https://www.google.fr";
        await google.save();

        let result = await Link.findOne({url: "https://www.google.fr"});
        if (result){
            expect(result.url).to.equal("https://www.google.fr");
        }
    });

    it('successfully removes a given link', async () => {
        const google = await Link.findOne({url: "https://www.google.fr"});
        await google.remove();

        let result = await Link.findOne({url: "https://www.google.fr"});
        if (result){
            expect(result).not.to.exist;
        }
    });

    after(async () => {

        await word.remove();
        
        await zelda.remove();

        await connection.close();
    })
});