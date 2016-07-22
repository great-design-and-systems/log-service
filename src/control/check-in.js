'use strict';
var TimeIn = require('../entity/TimeIn');

function execute(data, callback) {
    TimeIn.create(data, callback);
}

module.exports = execute;