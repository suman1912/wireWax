const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const breedCategorySchema = new Schema({
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
    rate: {
        type: String,
        required: true
    },
    units: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
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
    breedId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    breedData: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
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
        livestockData: [{
            _id: {
                type: Schema.Types.ObjectId,
                required: true
            },
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
        }]
    }]
});

module.exports = mongoose.model('breedCategory', breedCategorySchema);