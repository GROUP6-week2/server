const Image = require('../models/Image')
const User = require('../models/User')
const {getMood} = require('../helpers/helper')

module.exports = {
    get(req, res) {
        Image.findById(req.query.id)
            .then((result) => {
                if (!result) {
                    res.status(400).json({
                        message: "image is not found"
                    })
                } else {
                    res.status(200).json({
                        imageUrl: result.imageUrl,
                        mood: result.mood
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            });
    },
    uploadImage(req, res) {
        let imagePath = req.file.cloudStoragePublicUrl
        // res.json(req._currentUser)
        Image.create({
            imageUrl: imagePath,
            userId: req._currentUser._id
        })
        .then((result) => {
            let imageId = result._id
            let mood = getMood(result.mood[0])
            return User.findOneAndUpdate({
                _id: req._currentUser._id
            }, {
                currentMood: mood,
                currentImage: result._id
            }, {
                upsert: true,
                new: true
            }).populate('currentImage')
        })
        
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });



        
    },
    findMatch(req, res) {
       User.findOne({
           _id: req._currentUser._id
       })
       .then((result) => {
           return User.find({
               _id: {$ne: result._id},
               currentMood: result.currentMood
           }).populate({path:'currentImage'})
        })
        .then((result) => {
            res.status(200).json(result)           
       })
       .catch((err) => {
            res.status(400).json({
                message: err.message
            })
       });
    }
}
    