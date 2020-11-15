import { Game, Board } from "../entity";
import { makeMoveController } from "../controllers";
import { Arg, Ctx, Mutation, PubSub, PubSubEngine, Query, Resolver, ResolverFilterData, Root, Subscription } from "type-graphql";
import { CreateGameInput, DeleteGameInput, JoinGameInput, MakeMoveInput, FindGameInput } from "../Interfaces/GamesInput";
import { NotificationPayload, Notification } from "../Interfaces/Notification";

@Resolver()
export class GameResolver {
    @Mutation(() => Game)
    async createGame(
        @Arg("params", () => CreateGameInput) params: CreateGameInput) {
        const board = await Board.create().save();
         return await Game.create({ ...params, board }).save();        
    }
    @Mutation(() => Boolean)
    async joinGame(
        @Arg("params", () => JoinGameInput) params: JoinGameInput
    ) {
        await Game.update({ id: params.id }, params);
        return true;
    }
    @Mutation(() => Game)
    async makeMove(
        @PubSub() pubSub: PubSubEngine,
        @Arg("params", () => MakeMoveInput) params: MakeMoveInput        
    ): Promise<Game>  {            
        const payload: NotificationPayload = { message: "WORLD QUERSHI" };
        await pubSub.publish("NOTIFICATIONS", {message: payload});
        return await makeMoveController(params);
    }

    @Mutation(() => Boolean)
    async deleteGame(
        @Arg("params", () => DeleteGameInput) params: DeleteGameInput
    ) {
        await Game.delete({ id: params.id });
        return true;
    }

    @Query(() => Game)
    async findGame(
        @Arg("params", () => FindGameInput) params: FindGameInput
    ) {
        return await Game.findOne({id: params.id},{ relations: ["board"] });
    }

    @Query(() => [Board])
    boards() {
        return Board.find();
    }

    @Query(returns => String)
    async hello(@Ctx() ctx: any) {
        await ctx.wss.emit('NOTIFICATIONS', { message: 'welcome to the chat' });
        await ctx.pubSub.publish('NOTIFICATIONS', {message: 'THIS IS REAL'});
        return "Hello World"
    }

    @Subscription(() => String, {
        topics: ["MESSAGES","NOTIFICATIONS"]
    })
    async subscription(@Ctx() ctx: any): Promise<any> {
        return "something";
    }
}