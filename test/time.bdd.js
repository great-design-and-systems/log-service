'use strict';
var Time = require('../src/boundary/time');
var Database = require('./config/database');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var CONNECT_TEST_TIMEOUT = process.env.CONNECT_TEST_TIMEOUT || 50000;
describe('Time Service BDD', function () {
    var db = new Database();

    beforeEach(function (done) {
        this.timeout(CONNECT_TEST_TIMEOUT);
        return db.connect(done);
    });

    describe('GIVEN: the person checks in', function () {
        var currentTime = '2016-07-23 01:07';
        var personType = 'Visitor';
        var fullname = 'Analyn Flores';
        var purpose = 'Research';
        var personId = '123456789';
        var department = 'College of Science';
        var studentLevel = '1st Year';
        var data = {};

        beforeEach(function () {
            data.currentTime = currentTime;
            data.personType = personType;
            data.fullname = fullname;
            data.purpose = purpose;
            data.personId = personId;
            data.department = department;
            data.studentLevel = studentLevel;
        });

        describe('WHEN: saving time-in', function () {
            var expectedResult;
            beforeEach(function (done) {
                Time.checkIn(data, function (err, result) {
                    expectedResult = result;
                    done();
                });
            });

            it('THEN: return is true', function () {
                expect(!!expectedResult).to.equal(true);
            });

            describe('WHEN: updating purpose', function() {
                var updateResult;
                var updateErr;
                var newPurpose = 'sleep';
                beforeEach(function (done) {
                    Time.checkInPurpose(expectedResult._id, newPurpose, function (err, result) {
                        updateErr = err;
                        updateResult = result;
                        done();
                    });
                });

                it('THEN: return is true', function () {
                    expect(updateErr).to.be.null;
                    expect(!!updateResult).to.equal(true);
                }); 
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
                Time.getTimeInRecords(data, function (err, result) {
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