const express = require("express");
const router = express.Router();
const { users } = require("../data/users");
const {generateToken} = require("../middlewares/authMiddleware");

router.get("/", function (req, res) {
    const loginForm = `
                        <form action ="/login" method="post">
                        <label for="username">Usuario:</label>
                        <input type="text" id="username" name="username" required><br>
                        <label for="password">Contraseña:</label>
                        <input type="text" id="password" name="password" required><br>
                        <button type="submit">Iniciar sesión</button>
                        </form>`;
    res.send(loginForm);
});

router.post("/login", function (req, res) {
    const {username, password} = req.body;
    console.log(req.body)
    const user = users.find(user => user.username === username && user.password === password);
    console.log(users)

    if (user) {
        const token = generateToken(user);
        req.session.token = token;
        res.redirect("/dashboard")
    } else {
        res.status(401).json({mensaje: "Acceso denegado"})
    }
});

router.get("/dashboard", function (req, res) {
    res.send(console.log("Esto es dashboard"))
})

router.post("/logout", function (req, res) {
    res.send(console.log("Esto es el logout"));
});

module.exports = {router};