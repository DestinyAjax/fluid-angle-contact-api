const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('errorhandler');

/** Setting up environment variable **/
const isProduction = process.env.NODE_ENV === 'production';
const port  = process.env.PORT || 5000;
const app = express();
const router = express.Router();

/** set up middlewares */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(helmet());
app.use(session({ 
	secret: 'fluid-contact-api', 
	cookie: { maxAge: 60000 }, 
	resave: false, 
	saveUninitialized: false 
}));

if(!isProduction) {
	app.use(errorHandler());
}

/** set up routes {API Endpoints} */
require('./models/user');
require('./config/passport');
app.use(require('./routes'));

/** configuring errorhandler and middleware */
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if(!isProduction) {
	app.use((err, req, res, next) => {
		console.log(err.stack);
		err.status(err.status || 500);
		err.json({
			errors: {
				message: err.message,
				error: err,
			},
		});
	});
}
  
app.use((err, req, res) => {
	err.status(err.status || 500);
	err.json({
		errors: {
			message: err.message,
			error: {},
		},
	});
});

//set server and port
app.listen(port, () => {
	console.log('Server running on port ' + port);
});