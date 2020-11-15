//Websoket Server 
import express from "express";
import * as http from 'http';
import * as WebSocket from 'ws';

const app2 = express();
const server = http.createServer(app2);
const wss = new WebSocket.Server({ server });
wss.on('connection', (connection: WebSocket) => {

  wss.on('NOTIFICATIONS', (message: string) => {        
    console.log('received: %s');
    connection.send(`Hello, you sent -> ${message}`);
  });    

  console.log("Connection Created");
  connection.send('Hi there, I am a WebSocket server');
});



// server.listen(3000, () => {
//   console.log(`Websoket Server started on port ${server.address()?.port} :)`);
// });
  
export default wss;