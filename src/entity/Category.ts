import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import Word from "./Word";

@Entity()
export default class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Word, word => word.categories)
    words: Word[];

}
