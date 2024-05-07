const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("./data/users");
const session = require("express-session");
const app = express();
const port = 3000;
const { router } = require("./routes/users")

app.use(router)

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto 3000")
});