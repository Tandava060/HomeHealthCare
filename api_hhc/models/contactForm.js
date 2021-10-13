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
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    sent_on:{
        type:Date,
        default: Date.now()
    }
})

module.exports= mongoose.model('cforms',contactForm)