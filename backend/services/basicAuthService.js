const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg: "Pas de token"});
    }

    try {
        const decoded = jwt.verify(token, keys.jwtSecret);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token invalide."});
    }
}