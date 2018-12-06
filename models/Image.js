const mongoose = require('mongoose')
const axios = require('axios')

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

imageSchema.pre('save', function (next) {
    let self = this
    axios({
        url: 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        params: {
            'returnFaceAttributes': 'emotion'
        },
        data: {
            url: this.imageUrl
        }
    }).then(({ data, status }) => {
        let emotion = data.map(face => face.faceAttributes.emotion)
        self.mood = emotion
    }).catch(err => {
        console.error(err.message)
    })

})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image