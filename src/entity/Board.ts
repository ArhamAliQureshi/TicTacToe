import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";


@ObjectType()
@Entity()
export class Board extends BaseEntity{
    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Game, (game:Game)=> game.board) 
    @JoinColumn()
    game: Game


    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    a1: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    a2: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    a3: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    b1: string
    
    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    b2: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    b3: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    c1: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    c2: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", default: ""})
    c3: string
}

