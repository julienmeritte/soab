const mongoose = require("mongoose");
const keys = require("../config/keys");

const connectDatabase = async () => {
    try {
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log("Connexion DB réussie.");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;