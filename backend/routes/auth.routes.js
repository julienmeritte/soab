const passport = require("passport");
const express = require("express");
const router = express.Router();
const auth = require("../services/basicAuthService");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const {validationResult} = require("express-validator");
const {check} = require("express-validator");


router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur");
    }
});

router.post("/", [
    check('email', 'email not valid').isEmail(),
    check('password', 'password not valid').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                errors: [{msg: "L'utilisateur n'existe pas."}]
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({
                errors: [{msg: "L'utilisateur n'existe pas."}]
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            keys.jwtSecret,
            {expiresIn: 3600 * 60},
            (err, token) => {
                if (err) throw err;
                res.json({
                    id : user.id ,
                    token : token , 
                    name : user.name ,
                    email : user.email
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur");
    }
});

router.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get("/google/callback", passport.authenticate('google'));

router.get("/logout", (req, res) => {
    req.logout();
    res.send(req.user);
});

router.get("/currentuser", (req, res) => {
    res.send(req.user);
});

module.exports = router;
