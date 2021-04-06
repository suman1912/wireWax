const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
 
const liveStockSchema = new Schema({
    nameEnglish: {
        type: String,
        required: true
    },
    nameHindi: {
        type: String,
        default: null
    },
    nameOdia: {
        type: String,
        default: null
    },
    nameHo: {
        type: String,
        default: null
    },
    nameSanthali: {
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
    imageFile: {
        type: String,
        default: null
    },
    videoFile: {
        type: String,
        default: null
    },
    expectedAnalysis:{
        type: Boolean,
        default: true
    },
    contentAreaEnglish:{
        type: String,
        default: null
    },
    contentAreaHindi:{
        type: String,
        default: null
    },
    contentAreaOdia:{
        type: String,
        default: null
    },
    contentAreaHo:{
        type: String,
        default: null
    },
    contentAreaSanthali:{
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

module.exports = mongoose.model('LiveStock', liveStockSchema);