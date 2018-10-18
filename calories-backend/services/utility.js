import jwt from 'jwt-simple';
// import secret string used for tokenization
import secret from '../secret';

// generates tokens for users
exports.tokenForUser = function (user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, secret);
};

exports.validateEmail = function (email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

exports.addMealLog = function (user, req, res) {
	const { title, date, calories } = req.body;
	const logs = user.mealLog;
	const log = {
		title,
		calories: parseFloat(calories),
		date: new Date()
	};
	logs.push(log);
	console.log(logs);
	user.mealLog = logs;
	user.save((err) => {
		if (err) return res.status(500).send();
		return res.status(200).send(JSON.stringify(user)); 
	});
};

exports.removeMealLog = function (user, req, res) {
	const logId = req.params.logId;
	let logs = user.mealLog;
	logs = logs.filter((doc) => {
		return doc._id != logId;
	});
	user.mealLog = logs;
	user.save((err) => {
		if (err) return res.status(500).send();
		return res.status(200).send(JSON.stringify(user)); 
	});
};

exports.editMealLog = function (user, req, res) {
	const logId = req.params.logId;
	const { title, date, calories } = req.body;
	let logs = user.mealLog;
	const logIndex = logs.findIndex(log => log._id == logId);
	if (logIndex === -1) {
		return res.status(404).send();
	}
	let editLog = logs[logIndex];
	editLog.title = title || editLog.title;
	editLog.date = date || editLog.date;
	editLog.calories = calories || editLog.calories;
	console.log(editLog);
	logs[logIndex] = editLog;
	user.mealLog = logs;
	console.log(user.mealLog);
	user.save((err) => {
		if (err) return res.status(500).send();
		return res.status(200).send(JSON.stringify(user)); 
	});
};

exports.getUser = function (user, req, res) {
	let userObj = {
		email: user.email,
		createdAt: user.createdAt,
		role: user.role,
		expectedCalories: user.expectedCalories,
		logCount: user.mealLog.length
	};
	return res.status(200).send({user: userObj});
};

exports.editUser = function (user, req, res) {
	const { role, expectedCalories } = req.body;
	user.role = role || user.role;
	user.expectedCalories = expectedCalories || user.expectedCalories;
	user.save((err) => {
		if (err) return res.status(500).send();
		return res.status(200).send(JSON.stringify(user));
	});
};