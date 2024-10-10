const express = require("express");
const app = express();

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("index", {text: 'World'})
});

app.listen(8080, () => {
    console.log('server is listening on port 8080');
});

// เก็บ username,pwd ./front-end/src/Home.js