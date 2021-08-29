let Client = require('../models/client');

/**
 * Client storage class
 * @type {module.ClientRepository}
 */

module.exports = class ClientRepository{
    constructor(){
        this.clients = [];
    }
    get(index){
        return this.clients[index];
    }
    findAll(){
        return this.clients;
    }
    findByName(name){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.msgs[index].name == name )
                array.push(this.msgs[index]);
        }
        return array;
    }
    findBySocketId(socketId){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.msgs[index].socketId == socketId )
                array.push(this.msgs[index]);
        }
        return array;
    }    
    findByCode(code){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.msgs[index].code == code )
                array.push(this.msgs[index]);
        }
        return array;
    }
    findByReady(ready){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.msgs[index].ready == ready )
                array.push(this.msgs[index]);
        }
        return array;
    }
    findByRoom(room){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.msgs[index].room == room )
                array.push(this.msgs[index]);
        }
        return array;
    }
    count(){
        return this.clients.length;
    }
    insert(client){
        this.clients.push(client);
        return client;
    }
};