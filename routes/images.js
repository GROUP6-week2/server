var express = require('express');
var router = express.Router();
const imageController = require('../controllers/imageController')
const {authentication} = require('../middlewares/middleware')
const images = require('../middlewares/images')

/* GET users listing. */
router.get('/', authentication, imageController.get)
router.post('/', authentication, images.multer.single('image'), images.sendUploadToGCS, imageController.uploadImage);
router.get('/find', authentication, imageController.findMatch)

module.exports = router;
