'use strict';
var TimeIn = require('../entity/TimeIn');
var logger = require('./get-logger');

function execute(start, end, callback) {
    TimeIn.find({
        when: {
            $gte: start,
            $lte: end
        }
    }, function (err, result) {
        if (err) {
        	logger.error(err);
            callback({
                message: 'Failed to get today records'
            });
        } else {
            callback(null, result);
        }
    });
}

module.exports = execute;