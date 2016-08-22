'use strict';
var TimeIn = require('../entity/TimeIn');
var logger = require('./get-logger');

function execute(timeInID, purpose, callback) {
    TimeIn.findByIdAndUpdate(timeInID, { purpose: purpose }, function (err, result) {
        if (err) {
            logger.error('check-in-purpose', err);
            callback({
                message: 'Failed to update purpose: ' + timeInID
            });
        } else {
            callback(null, result);
        }
    });
}

module.exports = execute;