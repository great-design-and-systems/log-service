'use strict';
var TimeInRecords = require('../control/get-time-in-records');
var CheckIn = require('../control/check-in');
var CheckInPurpose = require('../control/check-in-purpose');
var TimeInfo = require('../control/get-time-info');
var GetTodayRange = require('../control/get-today-range');
var GetTodayRecords = require('../control/get-today-records');
var GetTimeInCountByPersonType = require('../control/get-time-in-count-by-person-type');
var GetTimeInCountByTime = require('../control/get-time-in-count-by-time');
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
        console.log('todayLongValue', todayLongValue);
        new GetTodayRange(todayLongValue, function (err, range) {
            if (err) {
                callback({ message: 'Failed to get today range.' });
            } else {
                console.log('range', range);
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
    },
    getTimeInCountByPersonType: function (dateParams, queryParam, callback) {
        console.log('dateParams', dateParams);
        console.log('personType', queryParam);
        var personTypes = [];
        if (queryParam.personType) {
            if (queryParam.personType instanceof Array) {
                personTypes = queryParam.personType;
            } else {
                personTypes.push(queryParam.personType);
            }
        }
        new GetTimeInCountByPersonType(dateParams, personTypes, function (err, result) {
            if (err) {
                callback({ message: 'Failed to get count by person type.' });
            } else {
                callback(undefined, result);
            }
        });
    },
    getTimeInCountByTime: function (dateParams, queryParam, callback) {
        console.log('dateParams', dateParams);
        console.log('personType', queryParam);
        var personTypes = [];
        if (queryParam.personType) {
            if (queryParam.personType instanceof Array) {
                personTypes = queryParam.personType;
            } else {
                personTypes.push(queryParam.personType);
            }
        }
        new GetTimeInCountByTime(dateParams, personTypes, function (err, result) {
            if (err) {
                callback({ message: 'Failed to get count by time.' });
            } else {
                callback(undefined, result);
            }
        });
    }
};