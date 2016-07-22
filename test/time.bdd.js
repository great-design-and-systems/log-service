'use strict';
var Time = require('../src/boundary/time');
var Database = require('./config/database');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
describe('Time Service BDD', function () {
    var db = new Database();

    beforeEach(function (done) {
        return db.connect(done);
    });

    describe('GIVEN: the person checks in', function () {
        var currentTime = '2016-07-23 01:07';
        var personType = 'Visitor';
        var fullname = 'Analyn Flores';
        var purpose = 'Research';
        var data = {};

        beforeEach(function () {
            data.currentTime = currentTime;
            data.personType = personType;
            data.fullname = fullname;
            data.purpose = purpose;
        });

        describe('WHEN: saving time-in', function () {
            var expectedResult;
            beforeEach(function (done) {
                Time.checkIn(data, function(err, result) {
                    expectedResult = result;
                    done();
                });
            });

            it('THEN: return is true', function () {
                expect(!!expectedResult).to.equal(true);
            });
        });
    });
    describe('GIVEN: time-in records are retrieved', function () {
        var dateFrom = '2016-07-22';
        var dateTo = '2016-07-22';
        var data = {};

        beforeEach(function () {
            data.dateFrom = dateFrom;
            data.dateTo = dateTo;
        });

        describe('WHEN: getting time-ins', function () {
            var expectedResult;
            beforeEach(function (done) {
                Time.getTimeInRecords(data, function(err, result) {
                    expectedResult = result;
                    done();
                });
            });

            it('THEN: return is true', function () {
                expect(!!expectedResult).to.equal(true);
            });
        });
    });
    afterEach(function (done) {
        return db.disconnect(done);
    });
});