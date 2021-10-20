const mongoose = require('mongoose')

const contactForm = new mongoose.Schema({
    ID:{
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    service: {
        type: String,
    },
    description: {
        type: String,
    },
    sent_on:{
        type:Date,
        default: Date.now()
    }
})

module.exports= mongoose.model('cforms',contactForm)