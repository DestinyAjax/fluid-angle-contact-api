"use strict"
const database = require('../config/db.config');
const User = database.users;
const passport = require('passport');

class UserService {

    /** the user authentication function */
    async authenticate(request, response, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if(err) {
                return next(err);
            }
        
            if(user) {
                user.token = user.generateJWT();
                return response.json({ user: user.toAuthJSON() });
            } else {
                console.log("I am not authenticated");
                return response.status(400).info;
            }
        
        })(request, response, next);
    }

    /** the create new user function */
    async create(data) {
        /** validating the username, ensuring there are no duplicate entry */
        if(await User.findOne({where: {username: data.username}})) {
            throw 'Username "' + data.username + '" already exist. Try again';
        }

        /** validaing the email, ensuring there are no duplicate entry **/
        if(await User.findOne({where: {email: data.email}})) {
            throw 'Email "' + data.email + '" already exist. Try again';
        }

        const user = new User(data);

        /** hashing user password */
        user.setPassword(data.password);

        /** saving the record **/
        return await user.save();
    }
}

module.exports = UserService;

