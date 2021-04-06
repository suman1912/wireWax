const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const SyncedUserDataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        default: null
    },
    username: {
        type: String,
        default: true
    },
    patch: [{
        cropId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        landType: {
            type: String,
            default: null
        },
        step1: {
            type: String,
            default: null
        },
        step2: {
            type: String,
            default: null
        },
        step3: {
            type: String,
            default: null
        },
        step4: {
            type: String,
            default: null
        },
        step5: {
            type: String,
            default: null
        },
        step6: {
            type: String,
            default: null
        },
        step7: {
            type: String,
            default: null
        },
        step8: {
            type: String,
            default: null
        }
    }],
    livestockData: [],
    moneyManagerData: [{
        type: {
            type: String,
            default: null
        },
        category: {
            type: String,
            default: null
        },
        amount: {
            type: String,
            default: null
        },
        date: {
            type: String,
            default: null
        },
    }],
    costBenifitAnalysis: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        cropName: {
            type: String,
            default: null
        },
        imageFile: {
            type: String,
            default: null
        },
        patchName: {
            type: String,
            default: null
        },
        landType: {
            type: String,
            default: null
        },
        farmingAreaInDecimal: {
            type: String,
            default: null
        },
        costOfCultivatinPerTenDecimal: {
            type: String,
            default: null
        },
        costPerKg: {
            type: String,
            default: null
        },
        productionInKg: {
            type: String,
            default: null
        },
        cost: {
            type: String,
            default: null
        },
        netProfit: {
            type: String,
            default: null
        },
    }],
    created_at: {
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE })
    }
});

module.exports = mongoose.model('SyncedUserData', SyncedUserDataSchema);