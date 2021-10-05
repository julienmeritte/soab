const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
});

module.exports = Game = mongoose.model("game", gameSchema);