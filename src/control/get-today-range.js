'use strict';
function execute(today, callback) {
    try {
        callback(undefined, {
            start: getTodayStartTime(today),
            end: getTodayEndTime(today)
        });
    } catch (err) {
        console.error(err);
        callback(err);
    }
}
function getTodayStartTime(today) {
    var start = new Date(today);
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}
function getTodayEndTime(today) {
    var end = new Date(today);
    end.setHours(23, 59, 59, 999);
    return end.getTime();
}

module.exports = execute;