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
        favicon: "http://localhost:3000/favicon.ico",
    },
    {
        id: 2, 
        title: "debian", 
        description: "download debian",
        link: "https://www.debian.org/",
        favicon: "https://www.debian.org/favicon.ico",
    },
    {
        id: 3, 
        title: "nodeJS", 
        description: "download nodeJS",
        link: "https://nodejs.org/",
        favicon: "https://nodejs.org/favicon.ico",
    }
];

app.get("/links/get", (req, res) => {
    res.json(links);
});

app.listen(13532, () => {
    console.log("Сервер запущен на порту 13532");
});