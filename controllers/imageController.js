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
    }
}
