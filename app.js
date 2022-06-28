var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
const https = require('https');

/* 1초 = 1000밀리초 
1분 = 60초
1분 = 60000밀리초
10분 = 600000밀리초 */

setInterval(function () {
    https.get('https://seomunte.herokuapp.com/')
},600000);

var routers = require('./routes/route');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routers);

module.exports = app;





