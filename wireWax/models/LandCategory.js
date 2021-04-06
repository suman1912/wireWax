const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const landCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        default: null
    },
    image: {
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

module.exports = mongoose.model('LandCategory', landCategorySchema);