const {verifyToken} = require('../helpers/helper')
const User = require('../models/User')

module.exports = {
    authentication(req, res, next) {
        verifyToken(req.headers.auth, function(err, result){
            if (err) {
                res.status(400).json({
                    message: err.message
                })
            } else {
                User.findOne({
                    email: result.email
                })
                .then((result) => {
                    if(result) {
                        req._currentUser = result
                        next()
                    } else {
                        res.status(400).json({
                            message: "email not found"
                        })
                    }
                }).catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
            }
        })
    }
}