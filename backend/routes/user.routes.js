const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const {check, validationResult} = require("express-validator/check");

const User = require("../models/User");



router.put("/update" , [
    check('googleId', 'Id required').not().isEmpty(),
    check('name', 'Name required').not().isEmpty(),
    check('email', 'email not valid').isEmail(),
    check('password', 'password not valid').isLength({
        min: 6
    })
] , async(req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {googleId , name , email , password} = req.body;

    try {
        let user = await User.findOne({googleId})
        if (user) {
            user.name = req.query.name;
            user.email = req.query.email;
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(req.query.password, salt);
            await user.save();
        }
        else {
            return res.status(400).json({
                errors: [{msg: "L'utilisateur n'existe pas"}]
            });
        }
        return res.status(200).json({
            user: [{
                id : user.id , 
                name : user.name ,
                email : user.email ,
            }]
        });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur");
    }

}
);


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