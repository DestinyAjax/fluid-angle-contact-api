const database = require('../config/db.config');
const User = database.users;
const bcrypt = require('bcrypt-nodejs');

module.exports = {
	authenticate,
	create,
}

async function authenticate({username, password }) {
	const user = await User.findOne({ username });
	if (user && bcrypt.compareSync(password, user.password)) {
		const { password, ...userWithoutHash } = user.toObject();
		const token = jwt.sign({ sub: user.id }, config.secret);
		return {
			...userWithoutHash,
			token
		};
	}
}

/** the create new user function */
async function create(data) {
    /** validating the username, ensuring there are no duplicate entry */
    if(await User.findOne({where: {username: data.username}})) {
        throw 'Username "' + data.username + '" already exist. Try again';
    }

    /** validaing the email, ensuring there are no duplicate entry **/
    if(await User.findOne({where: {email: data.email}})) {
        throw 'Email "' + data.email + '" already exist. Try again';
    }

    /** creating the record **/
    await User.create({
        username: data.username,
        password: data.password,
        email: data.email
    });
}

