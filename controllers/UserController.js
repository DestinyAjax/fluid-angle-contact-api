"use strict"
const Service = require('../services/UserService');
const UserService = new Service();

class UserController {

    /** user signin function which returns a Promise on success or failure **/
	SignIn (request, response, next) {
		UserService.authenticate(request, response, next)
        .then(user => user ? response.json(user) : response.status(400).json({
            message: 'Email or password is incorrect'
        })).catch(err => next(err));
    }
    
    /** user signup function which returns a Promise on success or failure */
	SignUp (request, response, next) {
        if(request.body) {
            UserService.create(request.body)
                .then((user) => response.json({
                    data: user.ToAuthJSON()
                })).catch(err => next(err)
            );
        } else {
            response.status(422).json({
                'error': "Invalid Request. Please fill the form appropriately"
            }); 
        }
    }
    
    /** user signout function which returns a Promise */
    SignOut (request, response, next) {

    }
}

module.exports = UserController;

