const express = require("express");
const cors = require("cors");
const bodyParcser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParcser.json());

const links = [
    {
        id: "1", 
        title: "abc", 
        description: "wasd",
        link: "http://localhost:3000/index.html",
        favicon: "http://localhost:3000/favicon.ico",
    },
    {
        id: "2", 
        title: "debian", 
        description: "download debian",
        link: "https://www.debian.org/",
        favicon: "https://www.debian.org/favicon.ico",
    },
    {
        id: "3", 
        title: "nodeJS", 
        description: "download nodeJS",
        link: "https://nodejs.org/",
        favicon: "https://nodejs.org/favicon.ico",
    }
];

let nextId = Math.max(0, ...links.map(x => x.id)) + 1;

app.get("/links/get", (req, res) => {
    res.json(links);
});

app.post("/link/edit", (req, res) => {
    const data = req.body;
    for (let i = 0; i < links.length; i++) {
        if (links[i].id === data.id) {
            links[i].title = data.name;
            links[i].description = data.desc;
            links[i].link = data.link;
            links[i].favicon = generateFavicon(data.link);
        }
    }
    res.json({
        success: true,
    });
})

app.post("/link/add", (req, res) => {
    const data = req.body;
    const newLink = {
        id: nextId,
        title: data.name,
        description: data.desc,
        link: data.link,
        favicon: generateFavicon(data.link),
    };
    links.push(newLink);
    nextId++;
    res.json({
        success: true,
    });
});

app.post("/link/remove", (req, res) => {
    const data = req.body;
    for (let i = 0; i < links.length; i++) {
        if (links[i].id === data.id) {
            links.splice(i, 1)
        }
    }
    res.json({
        success: true,
    });
})

function generateFavicon(link) {
    slashCnt = 0;
    let res = link;
    for (let i = 0; i < link.length; i++) {
        let s = link[i];
        if (s === "/") {
            slashCnt++;
            if (slashCnt === 3) {
                res = link.slice(0, i);
                break;
            }
        }
    }
    return res + "/favicon.ico";
}

app.listen(13532, () => {
    console.log("Сервер запущен на порту 13532");
});