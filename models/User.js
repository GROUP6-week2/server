const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const {hashPassword} = require('../helpers/helper')

userSchema = new Schema({
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
    currentMood: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    currentImage: {
        type: ObjectId,
        ref: 'Image'
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User