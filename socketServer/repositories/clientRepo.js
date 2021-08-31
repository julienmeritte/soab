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
            if (this.clients[index].name == name )
                array.push(this.clients[index]);
        }
        return array;
    }
    findBySocketId(socketId){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.clients[index].socketId == socketId )
                array.push(this.clients[index]);
        }
        return array;
    }    
    findByCode(code){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.clients[index].code == code )
                array.push(this.clients[index]);
        }
        return array;
    }
    findByReady(ready){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.clients[index].ready == ready )
                array.push(this.clients[index]);
        }
        return array;
    }
    findByRoom(room){
        let array = [];
        for (let index = 0; index < this.clients.length; index++) {
            if (this.clients[index].room == room )
                array.push(this.clients[index]);
        }
        return array;
    }
    setReady(code) {
        for(let index = 0; index < this.clients.length; index++) {
            if (this.clients[index].code == code) {
                this.clients[index].setReady(true);
            }
        }
    }


    count(){
        return this.clients.length;
    }
    insert(client){
        this.clients.push(client);
        return client;
    }
};