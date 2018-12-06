var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('test index')
});

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router;
