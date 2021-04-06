const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const SmsTemplateSchema = new Schema({
    contentEnglish: {
        type: String,
        required: true
    },
    contentHindi: {
        type: String,
        default: null
    },
    contentOdia: {
        type: String,
        default: null
    },
    contentHo: {
        type: String,
        default: null
    },
    contentSanthali: {
        type: String,
        default: null
    },
    status: { //Define status like Active: 1, Deleted: 0
        type: Number,
        default: 1
    },
    created_at:{
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    },
    updated_at: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('SmsTemplate', SmsTemplateSchema)