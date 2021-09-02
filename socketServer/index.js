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
    socket.on('createPlayer' , (data) => {
        let client = new Client();
        client.setName(data.name);
        client.setRoom(data.room);
        client.setSocket(socket.id);
        if (clientRepo.findByRoom(data.room).length === 0) {
            client.setCreator(true);
        }
        else {
            client.setCreator(false);
        }
        clientRepo.insert(client);
        socket.emit('getPlayer' , {name : client.getName() , socketID : client.getSocket() , room : client.getRoom() , code : client.getCode() , creator : client.getCreator()})
    });

    socket.on('SubmitDataToPlayers' , (info) => {
        socket.emit('return-submitData' , {room : info.room , code : info.code , data : info.data});
    });

    socket.on('setPlayerReady' , (data) => {
        clientRepo.setReady(data.code);
        let user = clientRepo.findByCode(data.code);
        //socket.emit('return-ready' , {name : user[0].getName() , socketID : user[0].getSocket() , room : user[0].getRoom() , code : user[0].getCode() , creator : user[0].getCreator() , ready : user[0].getReady()});
    });

    socket.on('GetAllReady' , (data) => {
        let arr = clientRepo.findByRoom(data.room);
        let check = true;
        for (index = 0 ; index < arr.length; index++) {
            if (arr[index].ready == false) {
                check = false;
                break;
            }
        }
        socket.emit('return-allReady' , {room: data.room , ready: check});
    });

    socket.on('getAllPlayer' , (data) => {
        socket.emit('getAllPlayer' , clientRepo.findAll());
    });

    socket.on('sendMessage' , (data) => {
        let msg = new Msg();
        msg.setName(data.name);
        msg.setRoom(data.room);
        msg.setText(data.msg);
        msgRepo.insert(msg);
    });
    
    socket.on('getAllMessage' , (data) => {
        socket.emit('getAllMessageReturn' , msgRepo.findByRoom(data.room));
    });

    /*socket.on("disconnect", () => {
        clientRepo.deleteBySocketID(socket.id);
        console.log(clientRepo.findAll());
    });*/

    socket.on('getAllPlayersByRoom' , (data) => {
        socket.emit('givePlayersByRoom' , {
            players: clientRepo.findByRoom(data.room)
        });
    });

    // SOCKET JEU
    socket.on('setHand' , (data) => {
        console.log(data.test);
        socket.to(data.socketID).emit('getCards' , {
            message: data.test + ' hum le caca c bon'
        });
    });



})


console.log("this Server started at port : 3002");