import { expect } from 'chai';
import { createConnection } from 'typeorm';
import User from '../src/entity/User';
import Word from '../src/entity/Word';
import Category from '../src/entity/Category';

describe('Category CRUD', () => {
    let connection;
    let felix;
    let word;

    before(async () => {
        connection = await createConnection();

        felix = new User();
        felix.name = "Felix";
        await felix.save();

        word = new Word();
        word.name = "Browser";
        word.definition = "Search and thou shall find"
        word.owner = felix;
        await word.save();
    });

    it('properly creates the category', async () => {
        const category = new Category();
        category.name = "WebDev";
        category.words = [word];
        await category.save();

        let category_created = await Category.findOne({name: "WebDev"});
        if (category_created){
            expect(category_created).to.exist;
        }

        let parent = await Word.findOne({name: "Browser"}, {relations: ["categories"]});
        expect(parent.categories.length).to.be.greaterThan(0);
    });

    // it('successfully updates a given category', async () => {
    //     const google = await Link.findOne({url: "https://www.google.com"});
    //     google.url = "https://www.google.fr";
    //     await google.save();

    //     let result = await Link.findOne({url: "https://www.google.fr"});
    //     if (result){
    //         expect(result.url).to.equal("https://www.google.fr");
    //     }
    // });

    // it('successfully removes a given category', async () => {
    //     const google = await Link.findOne({url: "https://www.google.fr"});
    //     await google.remove();

    //     let result = await Link.findOne({url: "https://www.google.fr"});
    //     if (result){
    //         expect(result).not.to.exist;
    //     }
    // });

    after(async () => {

        await word.remove();
        
        await felix.remove();

        await connection.close();
    })
});