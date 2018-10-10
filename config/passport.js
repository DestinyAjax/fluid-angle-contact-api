const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const database = require('../config/db.config');
const Users = database.users;

passport.use(new LocalStrategy({
        usernameField: 'user[email]',
        passwordField: 'user[password]',
    }, 
    (email, password, done) => {
        Users.findOne({ email: email }).then((user) => {
            if(!user || !user.validPassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            } else {
                return done(null, user);
            }
        }).catch(done);
    }
));

