var express = require('express');
var router = express.Router();
const imageController = require('../controllers/imageController')


router.get('/', imageController.get)

module.exports = router;
