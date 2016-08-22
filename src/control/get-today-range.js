'use strict';
var logger = require('./get-logger');

function execute(today, callback) {
    try {
        callback(undefined, {
            start: getTodayStartTime(today),
            end: getTodayEndTime(today)
        });
    } catch (err) {
    	logger.error(err);
        callback(err);
    }
}
function getTodayStartTime(today) {
    var start = new Date(parseInt(today));
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}
function getTodayEndTime(today) {
    var end = new Date(parseInt(today));
    end.setHours(23, 59, 59, 999);
    return end.getTime();
}

module.exports = execute;