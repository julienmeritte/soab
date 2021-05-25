const passport = require("passport");
const GoogleAuthStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose");
const keys = require("../config/keys")

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});

passport.use(
    new GoogleAuthStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: 'http://localhost:3001/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}).then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({
                        googleId: profile.id
                    })
                        .save()
                        .then((user) => done(null, user));
                }
            });
        }
    )
);