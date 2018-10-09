const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/** Connecting the signup route to the userController */
router.route('/user/signup').post(userController.SignUp);

/** Connecting the signin route to the userController */
router.route('/user/signin').post(userController.SignIn);

module.exports = router;