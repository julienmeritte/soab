let msg = require('../models/message');

/**
 * Client storage class
 * @type {module.msgRepository}
 */

module.exports = class msgRepository{
    constructor(){
        this.msgs = [];
    }
    get(index){
        return this.msgs[index];
    }
    findAll(){
        return this.msgs;
    }
    findByName(name){
        let array = [];
        for (let index = 0; index < this.msgs.length; index++) {
            if (this.msgs[index].getName() == name )
                array.push(this.msgs[index]);
        }
        return array;
    }
    findByText(text){
        let array = [];
        for (let index = 0; index < this.msgs.length; index++) {
            if (this.msgs[index].getText() == text )
                array.push(this.msgs[index]);
        }
        return array;
    }    
    findByRoom(room){
        let array = [];
        this.msgs.forEach(element => {
            if (element.getRoom() == room) {
                array.push(element);
            }
        });
        return array;
    }
    count(){
        return this.msgs.length;
    }
    insert(msg){
        this.msgs.push(msg);
        return msg;
    }
};