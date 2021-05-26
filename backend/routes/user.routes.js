const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const {check, validationResult} = require("express-validator/check");

const User = require("../models/User");

router.post("/register", [
    check('name', 'Name required').not().isEmpty(),
    check('email', 'email not valid').isEmail(),
    check('password', 'password not valid').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                errors: [{msg: "L'utilisateur existe déjà"}]
            });
        }

        const picture = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        })

        user = new User({
            name,
            email,
            password,
            picture
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
                res.json({token});
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;