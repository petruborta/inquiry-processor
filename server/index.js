require("dotenv").config();
import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";
import inquiries from "./routes/inquiries/inquiries.js";

const app = express();
const port = process.env.PORT || 4242;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const indexFile = path.resolve("./src/index.html");
    const app = ReactDOMServer.renderToNodeStream(<App />);

    fs.readFile(indexFile, "utf8", (err, data) => {
        if (err) {
            console.error("Something went wrong:", err);
            return res.status(500).send("Oops, better luck next time!");
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

app.use("/inquiries", inquiries);

app.get("*", (req, res) => {
    res.sendFile(path.resolve("./src/index.html"));
});

app.listen(port, () => {
    console.info(`Server up and running on port ${port}!`);
});
