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
            if (this.clients[index].socketID == socketId )
                array.push(this.clients[index]);
        }
        return array;
    }    
    findByCode(code){
        for (let client of this.clients) {
            if (client.code === code) {
                return client;
            }
        }

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

    deleteBySocketID(socketID) {
        let userDel = this.findBySocketId(socketID);
        let indexOfuserDel = 0;
        for (let index = 0 ; index < this.clients.length ; index++) {
            if (userDel[0].room !== undefined || userDel[0].room !== null) {
                if (this.clients[index].room == userDel[0].room && this.clients[index].socketID == userDel[0].socketID) {
                    indexOfuserDel = index;
                }
                if (this.clients[index].room == userDel[0].room && this.clients[index].socketID != userDel[0].socketID && userDel[0].creator == true) {
                    this.clients[index].creator = true;
                }
            }
        }
        this.clients.splice(indexOfuserDel , 1);
    }


    count(){
        return this.clients.length;
    }
    insert(client){
        this.clients.push(client);
        return client;
    }

    setCards(cards, code) {
        for(let client of this.clients) {
            if (client.code === code) {
                client.setCards(cards);
                break;
            }
        }
    }

    getCards(code) {
        for(let client of this.clients) {
            if (client.code === code) {
                return client.getCards();
            }
        }
    }

    setAction(action, code) {
        for(let client of this.clients) {
            if (client.code === code) {
                client.setAction(action);
                break;
            }
        }
    }

    getAction(code) {
        for(let client of this.clients) {
            if (client.code === code) {
                return client.getAction();
            }
        }
    }

    setTexte(texte, code) {
        for(let client of this.clients) {
            if (client.code === code) {
                client.setTexte(texte);
                break;
            }
        }
    }

    getTexte(code) {
        for(let client of this.clients) {
            if (client.code === code) {
                return client.getTexte();
            }
        }
    }
};