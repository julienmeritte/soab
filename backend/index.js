const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passportService");

const connectDatabase = require("./controllers/database");

const app = express();

connectDatabase();

app.use(express.json({
    extended: false
}));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/profile", require("./routes/profile.routes"));

app.listen(3001, () => {
    console.log("Running on 3001.");
});