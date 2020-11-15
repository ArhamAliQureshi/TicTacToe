# Tic Tac Toe


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Following assumptions:
  - Playre 1 symbol should be X (HOST)
  - Playre 2 symbol should be O (OPPONENT)
  - If player 2 has not joined the game, Computer AI will play as the opponent.
  - Subscription is not working at the moment so find game api needs to be used as polling

Steps to start game:
  - $npm install
  - $npm start
 
Important Information:
  - use $npm start to run the application
  - Port: 4000
  - GraphQL Playground http://localhost:4000/graphql
  

#### Create Game
```sh
mutation {
  createGame(params: { hostName: "<Player Name>" })
  {
    id,
    hostName,
    opponentName,  
  }
}
```
#### Find Game By Id
```sh
{
  findGame(params:{id: <GAME ID>}){
    id,
    hostName,
    opponentName,
    winner,
    board{      
      a1,
      a2,
      a3,
      b1,
      b2,
      b3,
      c1,
      c2,
      c3,
      history
    }
  }
}
```
#### Join Game
```sh
mutation {
  joinGame(params:{
    id: <GAME ID>,
    opponentName: "<Player 2 Name>"
  })
}
```
#### Make Move
```sh
mutation{
  makeMove(params:{
    id: <GAME ID>
    player: "<PLAYER SYMBOL [X|O]>"",
    box: ""
  }){      
    hostName,
    winner,
    opponentName,
    message,
    board{
      a1,
      a2,
      a3,
      b1,
      b2,
      b3,
      c1,
      c2,
      c3,
      history
    }
  }
}
```
### Get history for a game by
```sh
{
  findGame(params:{id: 4}){    
    board{            
      history
    }
  }
}
```
#### List Game Boards (Extra API)
```sh
{
  boards{
    id,
    a1,
    a2,
    a3,
    b1,
    b2,
    b3,
    c1,
    c2,
    c3,
    history
  }
}
```
#### Delete Game (Extra API)
```sh
mutation{
  deleteGame(params:{id: <GAME ID>})
}
```
