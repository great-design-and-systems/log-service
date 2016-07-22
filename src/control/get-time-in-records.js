'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(param, callback) {
    TimeIn.find({
        createdOn: {
            $gte: param.dateFrom,
            $lte: param.dateTo
        }
    }, callback);
}

module.exports = execute;