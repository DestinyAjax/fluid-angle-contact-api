const userService = require('../services/user.service')

module.exports = {
    /** user signin function which returns a Promise on success or failure **/
	SignIn: (req, res, next) =>  {
		userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({
            message: 'Username or password is incorrect'
        })).catch(err => next(err));
    },
    
    /** user signup function which returns a Promise on success or failure */
	SignUp: (request, response, next) => {
        if(request.body) {
            userService.create(request.body)
                .then(() => response.json({
                    message: "Registration was successful" 
                })).catch(err => next(err)
            );
        } else {
            response.status(422).json({
                'error': "Invalid Request. Please fill the form appropriately"
            }); 
        }
	}
}

