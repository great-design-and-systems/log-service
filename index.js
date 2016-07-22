var Database = require('./src/config/database');
var Server = require('./src/config/server');
var Resource = require('./src/boundary/time-resource');
var LoggerServer = require('./src/config/logger-server');
var express = require('express');
var app = express();

(function () {
    new Database();
    new Server(app);
    new Resource(app);
    new LoggerServer(app);
})();

module.exports = app;