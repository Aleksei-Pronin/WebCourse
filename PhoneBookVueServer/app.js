var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function (req, res) {
    res.status(404).send("Страница не найдена");
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send("Ошибка сервера");
});

module.exports = app;