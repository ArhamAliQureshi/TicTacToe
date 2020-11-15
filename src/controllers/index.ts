import { Game, Board } from "../entity";
import { MakeMoveInput } from "src/Interfaces/GamesInput";

export async function makeMoveController(params: MakeMoveInput): Promise<Game>{    

    let game = await Game.findOne({id: params.id}, {relations: ["board"]});
    const key:string = params.box;
    const isNotValid = validateMove(params, game);
    if(!isNotValid){
    
        let move = {};
        move[key] = game?.nextMove;

        await Board.update({id: game.board.id}, move);//Update move                    
        game = await Game.findOne({id: params.id}, {relations: ["board"]});    
        let result = await findWinner(game);                
        if(result){
            return Promise.resolve({...game, message: "Game is ended"}); 
        }

        await Game.update({id: params.id}, {nextMove: game.nextMove === "X"? "O":"X"});//Setting next player move
        await findNextMove(params, game, undefined);
    
        game = await Game.findOne({id: params.id}, {relations: ["board"]});        
        return Promise.resolve({...game, message: "Success"});        
    }
    else{
        return Promise.resolve({...game, message: isNotValid});
    }
}


function validateMove(params:MakeMoveInput, game:Game|undefined){
    
    let isNotValid:any = false;
    if(!game){

        isNotValid = "Game not found";
    }
    else if(game.winner){
        isNotValid = "Game has ended";
    }
    else if(params.player !== game?.nextMove){
        isNotValid = "Wrong Player Move";
    }
    else if(game?.board[params.box]!=""){
        isNotValid = "Wrong Box";
    }
    return isNotValid;
}

async function findNextMove(params:MakeMoveInput, game:Game|undefined, boxes:string[]|undefined){
    if(!game?.opponentName){
        boxes = boxes? boxes : ["a1","a2","a3",
                                "b1","b2","b3",
                                "c1","c2","c3"];
        let box = boxes[Math.floor(Math.random() * boxes.length)];
        if(game?.board[box] === ""){
            let tempParam:MakeMoveInput = {
                id: params.id,
                player: "O",
                box
            };
            await makeMoveController(tempParam);
        }
        else{
            boxes.splice(boxes.indexOf(box), 1)
            if(boxes.length>0){
                findNextMove(params, game, boxes);
            }            
        }
    }
}

async function findWinner(game:Game|undefined) {
    if(!game){
        return Promise.resolve(false);
    }
    let isWon;
    const temp:string = game.nextMove;
    isWon = [game.board.a1, game.board.a2, game.board.a3].every( (val, i, arr) => (val === arr[0] && val === temp) );    
    isWon = isWon || [game.board.b1, game.board.b2, game.board.b3].every( (val, i, arr) => (val === arr[0] && val === temp) );    
    isWon = isWon || [game.board.c1, game.board.c2, game.board.c3].every( (val, i, arr) => (val === arr[0] && val === temp) );
    
    isWon = isWon || [game.board.a1, game.board.b1, game.board.c1].every( (val, i, arr) => (val === arr[0] && val === temp) );
    isWon = isWon || [game.board.a2, game.board.b2, game.board.c2].every( (val, i, arr) => (val === arr[0] && val === temp) );
    isWon = isWon || [game.board.a3, game.board.b3, game.board.c3].every( (val, i, arr) => (val === arr[0] && val === temp) );
    
    isWon = isWon || [game.board.a1, game.board.b2, game.board.c3].every( (val, i, arr) => (val === arr[0] && val === temp) );
    isWon = isWon || [game.board.a3, game.board.b2, game.board.c1].every( (val, i, arr) => (val === arr[0] && val === temp) );
    
    if(isWon){        
        await Game.update({id: game.id},{winner: `Player ${game.nextMove} has won`})
    }
    return Promise.resolve(isWon);
    
}