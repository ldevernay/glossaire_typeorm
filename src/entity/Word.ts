import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import User from './User';
import Link from './Link';

@Entity()
export default class Word extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    definition: string;

    @ManyToOne(type => User, owner=> owner.words)
    owner: User;

    @OneToMany(type => Link, link => link.word)
    links: Link[];

}
