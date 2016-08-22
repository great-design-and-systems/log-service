'use strict';
var TimeIn = require('../entity/TimeIn');
var logger = require('./get-logger');

function execute(data, callback) {
    TimeIn.create(data, function (err, result) {
        if (err) {
            logger.error('check-in', err);
            callback({
                message: 'Failed to create timeIn.'
            });
        } else {
            callback(null, result);
        }
    });
}

module.exports = execute;