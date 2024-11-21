import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import homepageRouter from "./homepageRouter.js";
import assetsRouter from "./assetsRouter.js";
import dbRouter from "./dbRouter.js";

dotenv.config();

const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");
const distPath = path.join(path.resolve(), "dist");

const app = express();
// parse application/json
app.use(bodyParser.json())

app.get("/api/v1/hello", (_req, res) => {
    res.json({ message: "Hello, world!" });
});

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(distPath));
} else {
    app.use("/", express.static(publicPath));
    app.use("/src", assetsRouter);
}
app.use("/db", dbRouter);

// This must be last for views
app.use(homepageRouter);

app.listen(port, () => {
    console.log("Server listening on port", port);
});