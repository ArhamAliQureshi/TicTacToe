import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./Board";


@ObjectType()
@Entity()
export class Game extends BaseEntity{
    @Field(()=> Int, {nullable: true})
    @PrimaryGeneratedColumn()
    id: number

    @Field({nullable: true})
    @Column()
    hostName?: string

    @Field(()=> String, {nullable: true})
    @Column({type: "text", nullable: true})
    opponentName?: string

    @Field({nullable: true})
    @Column({type:"text", default: "X"})
    nextMove: string
    // @Field(()=> Board, {nullable: true})
    // @Column({type: "text", nullable: true})
    @Field({nullable: true})
    @OneToOne(() => Board, (board: Board)=>board.game, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}) 
    @JoinColumn()
    board: Board

    @Field({nullable: true})
    message?:string

    @Field({nullable: true})
    @Column({type: "text", nullable: true})
    winner?:string
}