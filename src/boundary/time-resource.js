'use strict';
var Time = require('./time');
var API = process.env.API_NAME || '/api/time/';

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.status(200).send({
            domain: process.env.DOMAIN_NAME || 'Time',
            links: {
                checkIn: { method: 'POST', url: 'http://' + req.headers.host + API + 'check-in' },
                getTimeIn: { method: 'GET', url: 'http://' + req.headers.host + API + 'get-time-in/:dateFrom/:dateTo' },
                checkInPurpose: { method: 'PUT', url: 'http://' + req.headers.host + API + 'check-in-purpose/:timeInID' },
                getTimeInfo: { method: 'GET', url: 'http://' + req.headers.host + API + 'get-time-info/:timeInID' },
                checkInVisitor: { method: 'POST', url: 'http://' + req.headers.host + API + 'check-in-visitor' },
                getTodayRecords: { method: 'GET', url: 'http://' + req.headers.host + API + 'get-today-records/:currentTimeMilis' },
                getTimeInCountByPersonType: { method: 'GET', url: 'http://' + req.headers.host + API + 'get-count-by-person-type/:dateFrom/:dateTo'},
                getTimeInCountByTime: { method: 'GET', url: 'http://' + req.headers.host + API + 'get-count-by-time/:dateFrom/:dateTo'}
            }
        });
    });
    app.get(API + 'get-time-in/:dateFrom/:dateTo', function (req, res) {
        Time.getTimeInRecords(req.params, function (err, result) {
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
    app.post(API + 'check-in', function (req, res) {
        Time.checkIn(req.body, function (err, result) {
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
    app.put(API + 'check-in-purpose/:timeInID', function (req, res) {
        Time.checkInPurpose(req.params.timeInID, req.body.purpose, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    message: 'ok'
                });
            }
        });
    });
    app.get(API + 'get-time-info/:timeInID', function (req, res) {
        Time.getTimeInfo(req.params.timeInID, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });
    });
    app.get(API + 'get-today-records/:currentTimeMilis', function (req, res) {
        Time.getTodayRecords(req.params.currentTimeMilis, function (err, result) {
            if (err) {
                res.status(200).send([]);
            } else {
                res.status(200).send(result);
            }
        });
    });
    app.post(API + 'check-in-visitor', function (req, res) {
        Time.checkInVisitor(req.body, function (err, result) {
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
    app.get(API + 'get-count-by-person-type/:dateFrom/:dateTo', function (req, res) {
    	res.status(200).send({Student: '100', Faculty: '50', Visitor: '20'});
//        Time.getTimeInCountByPersonType(req.params, req.query, function (err, result) {
//            if (err) {
//                res.status(500).send(err);
//            } else {
//            	res.status(200).send(result);
//            }
//        });
    });
    app.get(API + 'get-count-by-time/:dateFrom/:dateTo', function (req, res) {
    	res.status(200).send({
    		Student : [100,33,58,43,87,31,22,17,13,9,5],
    		Faculty : [23,53,67,58,89,22,43,56,12,25,1],
    		Visitor : [0,0,0,5,3,0,6,10,23,17,11]
    	});
    });
};