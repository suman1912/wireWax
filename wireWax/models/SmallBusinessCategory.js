const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const smallBusinessCategorySchema = new Schema({
    categoryEnglish: {
        type: String,
        required: true
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
    imageFile: {
        type: String,
        default: null
    },
    audioSanthali: {
        type: String,
        default: null
    },
    categoryType:{
        type:Number,
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

module.exports = mongoose.model('SmallBusinessCategory', smallBusinessCategorySchema);