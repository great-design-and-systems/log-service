'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(start, end, callback) {
    TimeIn.find({
        when: {
            $gte: start,
            $lt: end
        }
    }, function (err, result) {
        if (err) {
            callback({
                message: 'Failed to get today records'
            });
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;