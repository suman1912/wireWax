const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const vaccineSchema = new Schema({
    itemEnglish: {
        type: String,
        required: true
    },
    itemHindi: {
        type: String,
        default: null
    },
    itemOdia: {
        type: String,
        default: null
    },
    itemHo: {
        type: String,
        default: null
    },
    itemSanthali: {
        type: String,
        default: null
    },
    cost: {
        type: String,
        default: null
    },
    noOfTime: {
        type: Number,
        default: null
    },
    interval: {
        type: String,
        default: null
    },
    type: { //Define type like Goat: 0, Poultry: 1, Pig: 2
        type: Number,
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

module.exports = mongoose.model('Vaccination', vaccineSchema);