const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    owner:{
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    ttl:{
        type:Number,
        required:true
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
