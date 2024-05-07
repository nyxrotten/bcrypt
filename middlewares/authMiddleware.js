const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const app = express();


app.use(
    session({
        secret: "contraseña",
        resave: false,
        saveUninitialized: true,
        cookie: {secure:false}
    })
)

function generateToken(user) {
    return jwt.sign({user:user.id}, "contraseña", {expiresIn:"1h"} )
};

function verifyToken(req, res, next) {
    const token = req.session.token;
    if(!token) {
        return res.status(401).json({mensaje: "Token no proporcionado"})
    }
    jwt.verify(token, "contraseña", (err, decoded) => {
        if(err) {
            return res.status(401).json({mensaje: "Token no válido"})
        }
        req.user = decoded.user;
        next()
    })
}
module.exports = {generateToken, verifyToken}