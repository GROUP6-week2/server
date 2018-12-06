const Image = require('../models/Image')

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
            res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }
}
    