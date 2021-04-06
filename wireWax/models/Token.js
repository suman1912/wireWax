const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

module.exports = mongoose.model('Token', tokenSchema);