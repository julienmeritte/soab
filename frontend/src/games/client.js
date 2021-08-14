module.exports = class Client {
    constructor(name) {
        this.name = name;
        this.code = Math.random();
        this.ready = false;
        this.turn = 0;
        this.idSocket = null;
        this.channel = null;
    }

    setChannel(channel) {
        this.channel = channel;
    }
    getChannel(){
        return this.channel;
    }
    setName(name) {
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setCode(code) {
        this.code = code;
    }
    getCode(){
        return this.code;
    }
    setReady(ready){
        this.ready = ready;
    }
    getReady() {
        return this.ready;
    }
    setTurn(turn) {
        this.turn = turn;
    }
    getTurn() {
        return turn;
    }
    setIdSocket(id) {
        this.idSocket = id;
    }
    getIdSocket(){
        return this.idSocket;
    }

}