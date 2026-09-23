const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (req, res) {
    res.status(404).send("Страница не найдена");
});

app.use(function (err, req, res) {
    console.error(err);
    res.status(err.status || 500).send("Ошибка сервера");
});

module.exports = app;