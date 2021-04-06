const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const userRoleSchema = new Schema({
    roleName: {
        type: String,
        required: true
    },
    nameToTypeIndex: { 
        type: Number,
        required: true
    },
    description: { 
        type: String,
        default: null
    },
    menus:[{
        menuIndex:{
            type: Number,
            required: true
        },
        menuName:{
            type: String,
            required: true
        },
        permissions: {
            all: {
                type: Boolean,
                default: null
            },
            create: {
                type: Boolean,
                default: null
            },
            edit: {
                type: Boolean,
                default: null
            },
            delete: {
                type: Boolean,
                default: null
            },
            read: {
                type: Boolean,
                default: null
            }
        }
    }],
    status: {
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

module.exports = mongoose.model('UserRole', userRoleSchema);