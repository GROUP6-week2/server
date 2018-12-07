const User = require('../models/User')
const {generateToken, checkPassword} = require('../helpers/helper')

module.exports = {
    register(req, res) {
        let {name, email, password, phone} = req.body
        User.create({
            name,
            email,
            password,
            phone
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    },
    login(req, res) {
        let {email, password} = req.body
        User.findOne({
            email
        })
            .then((result) => {
                if (!result) {
                    res.status(400).json({
                        message: "email is not found"
                    })
                } else {
                    if (checkPassword(password, result.password)) {
                        let input = {
                            _id: result._id,
                            name: result.name,
                            email: result.email
                        }

                        res.status(200).json({token: generateToken(input)})
                    } else {
                        res.status(400).json({
                            message: "wrong password input!"
                        })
                    }
                }
            }).catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            });
    }
}