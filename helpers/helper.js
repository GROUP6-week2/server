var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    hashPassword(password){
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    checkPassword(password, hashed) {
        return bcrypt.compareSync(password, hashed);
    },
    generateToken(input) {
        console.log(process.env.JWT_KEY)
        return jwt.sign(input, process.env.JWT_KEY);
    },
    verifyToken(token, callback) {
        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) {
                callback(err)
            } else {
                callback(null, decoded)
            }
          });
    }
}