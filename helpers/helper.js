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
    },
    getMood(mood) {
        let {anger, contempt, disgust, fear, happiness, neutral, sadness, surprise} = mood
        let objMood = {
            anger, contempt, disgust, fear, happiness, neutral, sadness, surprise
        }
        // console.log(objMood)
        let arrayMood = Object.entries(objMood)
        arrayMood = arrayMood.sort((a,b) => b[1] > a[1])
       
        // let newObj = {}
        // arrayMood.forEach(element => {
        //     newObj[element[0]] = element[1]
        // });
        return arrayMood[0][0]
    }
}