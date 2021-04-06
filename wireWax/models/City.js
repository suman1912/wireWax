const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const citySchema = new Schema({
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    }
});

module.exports = mongoose.model('City', citySchema);