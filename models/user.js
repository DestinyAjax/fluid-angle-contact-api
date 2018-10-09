'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,  
      }
    }
    
  }, {
    hooks: {
      beforeCreate : function(user, options, next) {
        /** this function auto generate hash for password during user signup */
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, null, function(err, hash) {
            user.password = hash;
            next(null, user);
          });
        });
      }
    },

    instanceMethods: {
      /** this function compares the hash password before login */
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};