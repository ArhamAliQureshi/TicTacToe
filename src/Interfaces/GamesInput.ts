import { Field, InputType } from "type-graphql";

@InputType()
export class CreateGameInput{
    @Field()
    hostName: string;
}


@InputType()
export class JoinGameInput{
    @Field()
    id: number;

    @Field()
    opponentName: string;
}

@InputType()
export class FindGameInput{
    @Field()
    id: number;
}

@InputType()
export class MakeMoveInput{
    @Field()
    id: number;

    @Field()
    player: string;

    @Field()
    box: string;

}

@InputType()
export class DeleteGameInput{
    @Field()
    id: number;
}