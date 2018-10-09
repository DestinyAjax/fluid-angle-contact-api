const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

/** Setting up environment variable **/
const isProduction = process.env.NODE_ENV === 'production';
const port  = process.env.PORT || 5000;
const app = express();
const router = express.Router();

/** set up middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

/** set up routes {API Endpoints} */
app.use('/api', router);
app.use('/api', require('./routes/user.route'));

//set server and port
app.listen(port, () => {
	console.log('Server running on port ' + port);
});