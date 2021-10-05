const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const {check, validationResult} = require("express-validator/check");

router.post("/create_game", [
    check('name', 'Name required'),
    check('type', 'Type required'),
    check('description', 'Description required'),
    check('picture', 'Picture\'s location required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {name, type, description, picture} = req.body;

    try {
        let game = await Game.findOne({name});

        if (game) {
            return res.status(400).json({
                errors: [{msg: "Ce jeu existe déjà"}]
            });
        }

        game = new Game({
            name,
            type,
            description,
            picture
        })
        await game.save();

        return res.status(200).json({
            game: [{
                name : game.name ,
                type : game.type ,
                description : game.description ,
                picture : game.picture ,
            }]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur");
    }
});

router.get("/", async (req , res) => {
    try {
        const game = await Game.find();

        if (!game) {
            return res.status(400).json({msg: "Erreur, aucun jeu trouvé"});
        }

        res.json(game);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
});

module.exports = router;