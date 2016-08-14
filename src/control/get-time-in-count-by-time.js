'use strict';
var TimeIn = require('../entity/TimeIn');
var lodash = require('lodash');

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
				'hour' : {
					'$hour' : {
						$add : [ new Date(0), "$when" ]
					}
				},

			},
			total : {
				$sum : 1
			}
		}
	}, {
		$sort : {
			'_id' : 1
		}
	}, function(err, res) {
		if (err) {
			callback(err);
		} else {
			console.log(res);
			var output = {};

			for ( var i in res) {
				if (res[i]._id.hour >= 7) {
					var hours = output[res[i]._id.personType];
					if (!hours) {
						hours = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
					}
					hours[res[i]._id.hour - 7] = (res[i].total) ? res[i].total
							: 0;
					output[res[i]._id.personType] = hours;
				}
			}

			lodash.forEach(output, function(value, key) {
				output[key] = lodash.map(value, function(val) {
					return (val) ? val : 0;
				});
			});

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