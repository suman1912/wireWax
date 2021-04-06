const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const nutritionGradenSchema = new Schema({
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
    descEnglish: {
        type: String,
        default: null
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
    contentArea:{
        type: String,
        default: null
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
    imageFile: {
        type: String,
        default: null
    },
    status: { //Define status like Active: 1, Inactive: 0, Deleted: 2
        type: Number,
        default: 1
    },
    type:{ // nutration graden = 0, Family models = 1, Land measurement = 2, Selection of seeds = 3, Mulching = 4, IRRIGATION = 5, Weeding = 6, HARVEST AND POST HARVEST HANDLING = 7
        type:Number,
        default:null
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

module.exports = mongoose.model('NutritionGraden', nutritionGradenSchema);