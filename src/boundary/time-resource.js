'use strict';
var Time = require('./time');
var API = process.env.API_NAME || '/api/time/';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.status(200).send({
            domain: process.env.DOMAIN_NAME || 'Time',
            links: {
                checkIn: 'http://' + req.headers.host + API + 'check-in',
                getTimeInRecords: 'http://' + req.headers.host + API + 'get-time-in'
            }
        });
    });

    app.get(API + 'get-time-in/:dateFrom/:dateTo', function(req, res) {
        Time.getTimeInRecords(req.params, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    message: 'ok',
                    result: result
                });
            }
        });
    });


    app.post(API + 'check-in', function(req, res) {
        Time.checkIn(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    message: 'ok',
                    result: result._id
                });
            }
        });
    });

};