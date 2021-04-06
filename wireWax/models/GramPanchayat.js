const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const villageSchema = new Schema({
    village: {
        type: String,
        required: true
    },
    status: { //Define status like Active: 1, Inactive: 0, Deleted: 2
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    },
    updated_at: {
        type: Date,
        default: null
    }
});

const gramPanchayatSchema = new Schema({
    gramPanchayat: {
        type: String,
        required: true
    },
    blockId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    blockData: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        block: {
            type: String,
            required: true
        }
    }],
    status: { //Define status like Active: 1, Inactive: 0, Deleted: 2
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    },
    updated_at: {
        type: Date,
        default: null
    },
    villageData: [villageSchema]
});

module.exports = mongoose.model('GramPanchayat', gramPanchayatSchema);