const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const links = [
    {
        id: 1, 
        title: "abc", 
        description: "wasd",
        link: "http://localhost:3000/index.html",
    },
    {
        id: 2, 
        title: "debian", 
        description: "download debian",
        link: "https://www.debian.org/",
    },
    {
        id: 1, 
        title: "nodeJS", 
        description: "download nodeJS",
        link: "https://nodejs.org/",
    }
];

app.get("/links/get", (req, res) => {
    res.json(links);
});

app.listen(13532, () => {
    console.log("Сервер запущен на порту 13532");
});