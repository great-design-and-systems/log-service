'use strict';
var TimeIn = require('../entity/TimeIn');
var logger = require('./get-logger');

function execute(timeInID, callback) {
    TimeIn.findById(timeInID, 'fullname studentLevel department studentLevel when imageId',
        function (err, result) {
            if (err) {
            	logger.error(err);
                callback(err);
            } else {
                if (result) {
                    callback(null, result);
                } else {
                    callback(null, { message: 'No record found.' });
                }
            }
        });
}

module.exports = execute;