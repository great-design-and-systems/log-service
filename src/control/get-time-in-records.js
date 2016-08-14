'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(param, personTypes, callback) {
    TimeIn.find({
        when: {
            $gte: getDateStartTime(param.dateFrom),
            $lte: getDateEndTime(param.dateTo)
        }, personType : {
			$in : personTypes
		}
    }, callback);
}

function getDateStartTime(inputDate) {
	var start = new Date(inputDate);
	start.setHours(0, 0, 0, 0);
	return start.getTime();
}
function getDateEndTime(inputDate) {
	var end = new Date(inputDate);
	end.setHours(23, 59, 59, 999);
	return end.getTime();
}

module.exports = execute;