const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    company: {
        type: String,
        default: 'Unknown',
    },
    invoiceId: {
        type: String,
    },
    invoiceStart: {
        type: Date,
        default: Date.now,
    },
    invoiceEnd: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'pending',
    },
    amount: {
        type: Number,
    },
    term: {
        type: String,
        default: 'No terms',
    },
    items: [{
        item: String,
        qty: Number,
        rate: Number,
    }],
    created: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Invoice-details', invoiceSchema);