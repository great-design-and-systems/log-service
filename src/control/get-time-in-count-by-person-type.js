'use strict';
var TimeIn = require('../entity/TimeIn');
var logger = require('./get-logger');

function execute(dateParam, personTypes, callback) {
	var dateFrom = getDateStartTime(dateParam.dateFrom);
	var dateTo = getDateEndTime(dateParam.dateTo);
	console.log('dateFrom', dateFrom);
	console.log('dateTo', dateTo);
	TimeIn.aggregate({
		$match : {
			when : {
				$gte : dateFrom,
				$lte : dateTo
			},
			personType : {
				$in : personTypes
			}
		}
	}, {
		$group : {
			_id : '$personType',
			total : {
				$sum : 1
			}
		}
	}, function(err, res) {
		if (err) {
			logger.error('get-time-in-count-by-person-type', err);
			callback(err);
		} else {
			var output = {};
			for (var i in res) {
				if (res[i].total) {
					output[res[i]._id] = res[i].total;
				}
			}
			console.log(output);
			callback(undefined, output);
		}
		
	});
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