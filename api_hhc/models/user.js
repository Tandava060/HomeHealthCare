const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    ID:{
        type: String,
        unique: true
    },
    token: {
        type: String,
        unique: true
    },
    hash: String,
    name: {
        type: String,
        unique: true
    },
    perms: String,
    status: Boolean,
    created_on:{
        type:Date,
        default: Date.now()
    }
})

module.exports= mongoose.model('users',userSchema)