'use strict';
var TimeInRecords = require('../control/get-time-in-records');
var CheckIn = require('../control/check-in');
var CheckInPurpose = require('../control/check-in-purpose');
var TimeInfo = require('../control/get-time-info');
var GetTodayRange = require('../control/get-today-range');
var GetTodayRecords = require('../control/get-today-records');
module.exports = {
    getTimeInRecords: function (params, callback) {
        new TimeInRecords(params, callback);
    },
    checkIn: function (data, callback) {
        new CheckIn(data, callback);
    },
    checkInPurpose: function (timeInID, purpose, callback) {
        new CheckInPurpose(timeInID, purpose, callback);
    },
    getTimeInfo: function (timeInID, callback) {
        new TimeInfo(timeInID, callback);
    },
    checkInVisitor: function (data, callback) {
        data.personId = 0;
        data.personType = 'Visitor';
        new CheckIn(data, callback);
    },
    getTodayRecords: function (todayLongValue, callback) {
        new GetTodayRange(todayLongValue, function (err, range) {
            if (err) {
                callback({ message: 'Failed to get today range.' });
            } else {
                new GetTodayRecords(range.start, range.end, function (errTimeIn, records) {
                    if (errTimeIn) {
                        callback({
                            message: 'Failed to get time in records.'
                        });
                    } else {
                        callback(undefined, records);
                    }
                });
            }
        });
    }
};