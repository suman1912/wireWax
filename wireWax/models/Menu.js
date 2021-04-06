const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const menuSchema = new Schema({
    menuName: {
        type: String,
        required: true
    },
    created_at: { 
        type: Date, 
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    }
});

module.exports = mongoose.model('Menu', menuSchema);