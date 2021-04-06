const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const dryFishSellingSchema = new Schema({
    titleEnglish: {
        type: String,
        required: true
    },
    titleHindi: {
        type: String,
        default: null
    },
    titleOdia: {
        type: String,
        default: null
    },
    titleHo: {
        type: String,
        default: null
    },
    titleSanthali: {
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
    videoFile: {
        type: String,
        default: null
    },
    imageFile: {
        type: String,
        default: null
    },
    descriptionEnglish:{
        type: String,
        default: null
    },
    descriptionHindi:{
        type: String,
        default: null
    },
    descriptionOdia:{
        type: String,
        default: null
    },
    descriptionHo:{
        type: String,
        default: null
    },
    descriptionSanthali:{
        type: String,
        default: null
    },
    status: { //Define status like Active: 1, Deleted: 0
        type: Number,
        default: 1
    },
    type:{ // basic requirement = 0 , selection dry fish = 1, selling area = 2, particuler day = 3
        type:Number,
        default:null
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
    created_at:{
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    },
    updated_at: {
        type: Date,
        default: null
    },

});
 
module.exports = mongoose.model('DryFishSelling', dryFishSellingSchema)