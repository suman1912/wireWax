const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    district: {
        type: String,
        default: null
    },
    panchayat: {
        type: String,
        default: null
    },
    village: {
        type: String,
        default: null
    },
    participantNumber: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        default: null
    },
    block: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        block: {
            type: String,
            required: true
        },
        password: {
            type: String,
            default: null
        }
    }],
    type: { //Define user type like admin: 0, Field Officer: 1, Farmer: 2
        type: Number,
        required: true
    },
    custodianUser: {
        type: Boolean,
        default: false
    },
    status: { //Define status like Active: 1, Inactive: 0, Deleted: 2
        type: Number,
        default: 0
    },
    loggedInStatus: { //Define logged in status like log out: 0, logged in: 1
        type: Number,
        default: 0
    },
    token: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        default: null
    },
    created_at: {
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    },
    updated_at: {
        type: Date,
        default: null
    },
    userRole: {
        type: Object,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);