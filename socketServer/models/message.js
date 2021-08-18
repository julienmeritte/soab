module.exports = class Message {
    constructor() {
        this.name = null;
        this.room = null;
        this.text = null;
    }
    setText(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setRoom(room) {
        this.room = room;
    }
    getRoom() {
        return this.room;
    }
}