'use strict';
var TimeInRecords = require('../control/get-time-in-records');
var CheckIn = require('../control/check-in');
var CheckInPurpose = require('../control/check-in-purpose');
module.exports = {
    getTimeInRecords: function (params, callback) {
        new TimeInRecords(params, callback);
    },
    checkIn: function (data, callback) {
        new CheckIn(data, callback);
    },
    checkInPurpose: function (timeInID, purpose, callback) {
        new CheckInPurpose(timeInID, purpose, callback);
    }
};