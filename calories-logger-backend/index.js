import express from 'express';
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes');
import { localSettings as config } from './config';
/* eslint-disable no-unused-vars */
const passport = require('passport');
mongoose.connect(config.localDbURL, { useNewUrlParser: true });
const db = mongoose.connection;
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
	return res.status(500).send({error: 'Internal Server Error Has Occured! What a Shame...'});
});

app.listen(4000);

module.exports = app;
