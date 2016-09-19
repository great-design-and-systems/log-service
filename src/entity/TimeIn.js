var mongoose = require('mongoose');

var TimeInSchema = new mongoose.Schema({
    personId: {
        type: String,
        required: [true, 'PersonId is required.']
    },
    fullname: {
        type: String,
        required: [true, 'Name is required.']
    },
    personType: {
        type: String,
        required: [true, 'Person Type is required.']
    },
    purpose: {
        type: String,
        default: 'Research'
    },
    when: {
        type: Number,
        required: [true, 'When is required.']
    },
    imageId: String,
    department: String,
    studentLevel: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('timein', TimeInSchema);