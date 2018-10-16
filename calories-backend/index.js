/* eslint-disable global-require */
// import express framework
import express from 'express';
// initialize main application
const app = express();
// import CORS requests enabler
const cors = require('cors');
// import requests body parser
const bodyParser = require('body-parser');
// import request logger
const morgan = require('morgan');
// import connector of node and mongoDB
const mongoose = require('mongoose');
// import implemented routes
const router = require('./routes');
// import config file
import { localSettings as config } from './config';
/* eslint-disable no-unused-vars */
// for security and token
const passport = require('passport');
// connect node app to mongodb server
mongoose.connect(config.localDbURL, { useNewUrlParser: true });
// import get connection and check if it successfully connected
const db = mongoose.connection;
// log error if could not connect to database
db.on('error', console.error.bind(console, 'Database connection establishing error:'));
app.use(morgan('combined'));
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
const jsonParser = bodyParser.json({limit: 1024 * 1024 * 20, type: '*/*'});
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' });
app.use(jsonParser);
app.use(urlencodedParser);
app.use(passport.initialize());
router(app);
app.use(function (err, req, res, next) {
	console.error('Well, its embarassing! Server just got crashed...', err);
	return res(500).send({error: 'Internal Server Error Has Occured! What a Shame...'});
});

app.listen(4000);

// export app to enable usage of it in the server/index.js
module.exports = app;
