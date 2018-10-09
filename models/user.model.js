const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,  
            }
        }
    },
    {
        hooks: {
            beforeCreate : function(user, options, next) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    user.password = hash;
                    next(null, user);
                });
            });
            }
        },

        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });

    return User;
};