const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const importantLinkSchema = new Schema({
    categoryEnglish: {
        type: String,
        default: null
    },
    categoryHindi: {
        type: String,
        default: null
    },
    categoryOdia: {
        type: String,
        default: null
    },
    categoryHo: {
        type: String,
        default: null
    },
    categorySanthali: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    audioEnglish: {
        type: String,
        default: null
    },
    audioHindi: {
        type: String,
        default: null
    },
    audioOdia: {
        type: String,
        default: null
    },
    audioHo: {
        type: String,
        default: null
    },
    audioSanthali: {
        type: String,
        default: null
    }, 
    descEnglish: {
        type: String,
        required: true
    },
    descHindi: {
        type: String,
        default: null
    },
    descHo: {
        type: String,
        default: null
    },
    descOdia: {
        type: String,
        default: null
    },
    descSanthali: {
        type: String,
        default: null
    },
    descAudioEnglish: {
        type: String,
        default: null
    },
    descAudioHindi: {
        type: String,
        default: null
    },
    descAudioHo: {
        type: String,
        default: null
    },
    descAudioOdia: {
        type: String,
        default: null
    },
    descAudioSanthali: {
        type: String,
        default: null
    },
    status: { //Define status like Active: 1, Inactive: 0, Deleted: 2
        type: Number,
        default: 1
    },
    type: { // Important link menu types like Wash: 0, Health: 1, Covid19: 2, Government Schemes: 3
        type: Number,
        required: true
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

module.exports = mongoose.model('ImportantLink', importantLinkSchema)