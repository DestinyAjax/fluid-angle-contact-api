const router = require('express').Router();
const Controller = require('../../controllers/UserController');
const UserController = new Controller();
const auth = require('../auth');

/** Connecting the signup route to the userController */
router.post('/signup', auth.optional, function(request, response, next) {
    UserController.SignUp(request, response, next);
});

/** Connecting the signin route to the userController */
router.post('/signin', auth.optional, function(request, response, next){
    UserController.SignIn(request, response, next);
});

/** Connecting the signout route to the userController */
router.route('/signout').post(function(request, response, next){
    UserController.SignOut(request, response, next);
});

module.exports = router;