const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const officerSchema = new Schema({
    officerName: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
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

const blockSchema = new Schema({
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
    },
    password: {
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
    },
    fieldOfficerData: [officerSchema]
});

module.exports = mongoose.model('Block', blockSchema);