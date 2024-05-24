const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
