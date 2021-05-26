const express = require("express");
const router = express.Router();
const auth = require("../services/basicAuthService");
const Profile = require("../models/Profile");
const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ["name", "picture"]);

        if (!profile) {
            return res.status(400).json({msg: "Pas de profil."});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
});

router.post("/", auth, async (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;

    try {
        let profile = await Profile.findOne({user: req.user.id});
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true});
            return res.json(profile);
        }
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        res.status(500).send("Erreur Serveur.");
    }

});

router.get("/all", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "picture"]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
});

router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["name", "picture"]);

        if (!profile) {
            return res.status(400).json({msg: "Pas d'utilisateur."});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(400).json({msg: "Pas d'utilisateur."});
        }
        res.status(500).send("Erreur Serveur");
    }
});

router.delete("/", auth,async (req, res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: "Supprimé"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
});

module.exports = router;