'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(timeInID, purpose, callback) {
    TimeIn.findByIdAndUpdate(timeInID, { purpose: purpose }, function (err, result) {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

module.exports = execute;