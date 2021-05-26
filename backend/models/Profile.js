const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Profile = mongoose.model("profile", profileSchema);