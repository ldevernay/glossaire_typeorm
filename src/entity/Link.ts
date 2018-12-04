import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import Word from "./Word";

@Entity()
export default class Link extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    description: string;

    @ManyToOne(type => Word, word => word.links)
    word: Word;

}
