const express = require('express')
const app = express()
const socketIO = require('socket.io');
const Client = require('./models/client');
const ClientRepo = require('./repositories/clientRepo');
const Msg = require('./models/message');
const MsgRepo = require('./repositories/messageRepo');


server = app.listen(3002)

const io = socketIO(server , {
    cors:{
        origin:"http://localhost:3000",
        methods:['GET' , 'POST'],
    }
})

let clientRepo = new ClientRepo();
let msgRepo = new MsgRepo();

io.on('connection', (socket) => {
	console.log('New user connected')
    

    socket.on('createRoom' , (data) => {

    });
    socket.on('createPlayer' , (data) => {
        let client = new Client();
        client.setName(data.name);
        client.setRoom(data.room);
        client.setSocket(socket.id);
        clientRepo.insert(client);
        socket.emit('getPlayer' , {name : client.getName() , socketID : client.getSocket() , room : client.getRoom() , code : client.getCode()})
    });
    socket.on('getroom' , (data) => {

    });
    socket.on('getAllPlayer' , (data) => {
        socket.emit('getAllPlayer' , clientRepo.findAll());
    });
    socket.on('getAllRoom' , (data) => {

    });
    socket.on('sendMessage' , (data) => {
        let msg = new Msg();
        msg.setName(data.name);
        msg.setRoom(data.room);
        msg.setText(data.msg);
        msgRepo.insert(msg);
    });
    socket.on('getAllMessage' , (data) => {
        socket.emit('getAllMessageReturn' , msgRepo.findByRoom(data));
    });
})


console.log("this Server started at port : 3002");