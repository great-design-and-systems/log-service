'use strict';
var TimeIn = require('../entity/TimeIn');

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
			_id : {
				'personType' : '$personType',
				'hour' : {'$hour' : {$add: [new Date(0), "$when"]}},
				
			},
			total : {
				$sum : 1
			}
		}
	}, {
		$sort: { '_id': 1 }
	}, function(err, res) {
		if (err) {
			callback(err);
		} else {
			// var output = {};
			// for (var i in res) {
			// output[res[i]._id] = res[i].total;
			// }
			// console.log(output);
			// callback(undefined, output);
			console.log(res);
			callback(undefined, true);
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