const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const expenditureSchema = new Schema({
    imageFile:{
        type: String,
        default: null
    },
    videoFile:{
        type: String,
        default: null
    },
    audioEnglish:{
        type: String,
        default: null
    },
    audioHindi:{
        type: String,
        default: null
    },
    audioOdia:{
        type: String,
        default: null
    },
    audioHo:{
        type: String,
        default: null
    },
    audioSanthali:{
        type: String,
        default: null
    },
    itemEnglish:{
        type: String,
        required: true
    },
    itemHindi:{
        type: String,
        default: null
    },
    itemOdia:{
        type: String,
        default: null
    },
    itemHo:{
        type: String,
        default: null
    },
    itemSanthali:{
        type: String,
        default: null
    },
    unit:{
        type: String,
        required: true
    },
    unitPrice:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    type:{ // One Time Expenditure link : 0, Expenditure per day/lot : 1
        type: Number,
        required: true
    },
    status: { //Define status like Active: 1, Inactive: 0
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


module.exports = mongoose.model('Expenditure', expenditureSchema)