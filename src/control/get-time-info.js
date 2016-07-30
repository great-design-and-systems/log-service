'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(timeInID, callback) {
    TimeIn.findById(timeInID, 'fullname studentLevel department studentLevel when',
        function (err, result) {
            console.error(err);
            if (err) {
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