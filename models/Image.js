const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const imageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    }, 
    mood: {
        type: Schema.Types.Mixed,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    }
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image