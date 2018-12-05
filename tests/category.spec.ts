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

    it('successfully updates a given category', async () => {
        const webdev = await Category.findOne({name: "WebDev"});
        webdev.name = "Software";
        await webdev.save();

        let result = await Category.findOne({name: "Software"});
        if (result){
            expect(result).to.exist;
        }
    });

    it('successfully removes a given category', async () => {
        const webdev = await Category.findOne({name: "Software"});
        await webdev.remove();

        let result = await Category.findOne({name: "Software"});
        if (result){
            expect(result).not.to.exist;
        }
    });

    after(async () => {

        await word.remove();
        
        await felix.remove();

        await connection.close();
    })
});