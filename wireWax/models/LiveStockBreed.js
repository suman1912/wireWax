const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const liveStockBreedSchema = new Schema({
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
    imageFile: {
        type: String,
        default: null
    },
    videoFile: {
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
    livestockId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    updated_at: {
        type: Date,
        default: null
    },
    livestockData: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        nameEnglish: {
            type: String,
            required: true
        }, nameHindi: {
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
        }
    }]
});

module.exports = mongoose.model('LiveStockBreed', liveStockBreedSchema);