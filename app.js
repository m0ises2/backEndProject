const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

// Imports de las rutas:
const userRoutes = require('./routes/user');
const donorRoutes = require('./routes/donor');
const suscriptionRoutes = require('./routes/suscription');

const app = express();

// Evitar problemas de CORS:
app.use(function(req, res, next) {

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Prefijos de rutas:
app.use('/user', userRoutes);
app.use('/donor', donorRoutes);
app.use('/suscription', suscriptionRoutes);

module.exports = app;
