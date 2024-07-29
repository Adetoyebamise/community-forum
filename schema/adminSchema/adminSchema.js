const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Active'
    },
    role: {
        type: String,
    },
    accountType: {
        type: String,
        enum: ['admin', 'firstLevel', 'secondLevel'],
        default: 'admin'
    },
}, { timestamps: true})

module.exports = mongoose.model('Admin', adminSchema, 'admin')