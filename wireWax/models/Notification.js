const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const notificationSchema = new Schema({
    notificationEnglish: {
        type: String,
        default: null
    },
    notificationHindi: {
        type: String,
        default: null
    },
    notificationOdia: {
        type: String,
        default: null
    },
    notificationHo: {
        type: String,
        default: null
    },
    notificationSanthali: {
        type: String,
        default: null
    },
    userData: [{
        _id: {
            type: Schema.Types.ObjectId,
            require: true
        },
        seenStatus: {
            type: Number,
            default: 0
        },
    }],
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

module.exports = mongoose.model('Notification', notificationSchema);