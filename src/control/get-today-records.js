'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(start, end, callback) {
    TimeIn.find({
        when: {
            $gte: start,
            $lte: end
        }
    }, function (err, result) {
        console.error(err);
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