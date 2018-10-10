'use strict';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,  
      }
    }
  });

  /** this function compares the hash password before login */
  User.prototype.validPassword = function validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
  },

  /** this function hashes new user password */
  User.prototype.setPassword = function setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  },

  /** this function generate login token for user */
  User.generateJWT = function generateJWT() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      email: this.email,
      id: this.id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  },

  /** this is function convert auth details to JSON format */
  User.prototype.ToAuthJSON = function ToAuthJSON() {
    return {
      _id: this.id,
      email: this.email,
      token: User.generateJWT(),
    };
  }

  User.associate = function(models) {
    // associations can be defined here
  }

  return User;
};