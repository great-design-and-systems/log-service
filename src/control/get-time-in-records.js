'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(param, callback) {
    TimeIn.find({
        when: {
            $gte: new Date(param.dateFrom).getTime(),
            $lte: new Date(param.dateTo).getTime()
        }
    }, callback);
}

module.exports = execute;