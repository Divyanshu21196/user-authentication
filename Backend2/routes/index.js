var express = require('express');
var router = express.Router();
const authKey = require('../helpers/authentication');
const apiController = require('../controller/apiController');

router.post('/userSignup', apiController.userSignup);
router.post('/userLogin', apiController.userLogin);
router.get('/getProfile',authKey,apiController.getProfile);
module.exports = router;
