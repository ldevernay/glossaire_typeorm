import "reflect-metadata";
import {createConnection} from "typeorm";
import User from "./entity/User";
import Word from './entity/Word';
import Link from './entity/Link';
import { link } from "fs";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.name = "Bobby";
    await user.save();
    console.log("Saved a new user with id: " + user.id);
    
    console.log("Loading users from the database...");
    const users = await User.find();
    console.log("Loaded users: ", users);
     
    const word = new Word();
    word.name = "Toto";
    word.definition = "0+0";
    word.owner = user;
    await word.save();

    let words = await Word.find({relations: ["owner"]});
    console.log("Here is the owner of this word : ", word.owner.name);
    console.log("Here is a collection of words", words);

    console.log("Here is a list of book owners: ");
    words.map(w => console.log(w.owner.name));

    let google = new Link();
    google.url = "https://www.google.fr";
    google.description = "Search and thou shall find";
    google.word = word;
    await google.save();

    let duck = new Link();
    duck.url = "https://www.duckduckgo.com";
    duck.description = "Privacy included";
    duck.word = word;
    await duck.save();

    let words_w_links = await Word.find({relations: ["owner", "links"]});
    console.log("List of words with links and owner: ", words_w_links);
    
}).catch(error => console.log(error));
