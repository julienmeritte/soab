module.exports = class client {
    constructor() {
        this.name = null , 
        this.code = Math.random();
        this.socketID = null;
        this.room = null;
        this.ready = false;
        this.creator = false;
    }
    getReady() {
        return this.ready;
    }
    setReady(ready) {
        this.ready = ready;
    }
    getCreator() {
        return this.creator;
    }
    setCreator(creator) {
        this.creator = creator;
    }
    getName() {
        return this.name;
    }
    getCode(){
        return this.code;
    }
    getSocket() {
        return this.socketID;
    }
    getRoom() {
        return this.room;
    }
    setName(name) {
        this.name = name;
    }
    setSocket(socket) {
        this.socketID = socket;
    }
    setRoom(room) {
        this.room = room;
    }
}