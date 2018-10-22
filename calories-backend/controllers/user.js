import moment from 'moment-timezone';
const UserSchema = require('../models').userSchema;
const Utility = require('../services/utility');

const permissionLevel1 = ['admin'];
const permissionLevel2 = ['admin', 'manager'];

export function addMealLog(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.addMealLog(user, req, res);
		});
	} else {
		return Utility.addMealLog(req.user, req, res);
	}
}

export function removeMealLog(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.removeMealLog(user, req, res);
		});
	} else {
		return Utility.removeMealLog(req.user, req, res);
	}
}

export function editMealLog(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.editMealLog(user, req, res);
		});
	} else {
		return Utility.editMealLog(req.user, req, res);
	}
}

export function getMealLogs(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	let { fromDate, toDate, fromTime, toTime } = req.body;
	console.log(fromDate, toDate, fromTime, toTime);
	fromDate = new Date(fromDate);
	toDate = new Date(toDate);
	toDate = moment.tz(toDate, 'Asia/Tbilisi').add(1, 'days').toISOString();
	toDate = new Date(toDate);
	let mealLogs = [];
	if (userId != null) {
		UserSchema.findOne({_id: userId}, (err, user) => {
			mealLogs = user.mealLog;
			mealLogs = mealLogs.filter((log) => {
				const checkDate = new Date(log.date);
				console.log('Checking top----------', checkDate, checkDate >= fromDate, checkDate <= toDate, checkDate, toDate);
				if (checkDate >= fromDate && checkDate <= toDate) {
					console.log('Checking low------', checkDate);
					const time = moment.tz(checkDate, 'Asia/Tbilisi').format('HH:mm');
					console.log(time, fromTime, toTime);
					if (time >= fromTime && time <= toTime) {
						return log;
					}
				}
			});
			console.log(mealLogs);
			return res.status(200).send({ logs: mealLogs });
		});
	} else {
		mealLogs = req.user.mealLog;
		mealLogs = mealLogs.filter((log) => {
			const checkDate = new Date(log.date);
			console.log('Checking top----------', checkDate, checkDate >= fromDate, checkDate <= toDate, checkDate, toDate);
			if (checkDate >= fromDate && checkDate <= toDate) {
				console.log('Checking low------', checkDate);
				const time = moment.tz(checkDate, 'Asia/Tbilisi').format('HH:mm');
				console.log(time, fromTime, toTime);
				if (time >= fromTime && time <= toTime) {
					return log;
				}
			}
		});
		console.log(mealLogs);
		return res.status(200).send({ logs: mealLogs });
	}
}

export function getUser(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.getUser(user, req, res);
		});
	} else {
		return Utility.getUser(req.user, req, res);
	}
}

export function editUser(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		console.log(typeof req.user.role, permissionLevel2);
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.editUser(user, req, res, true);
		});
	} else {
		return Utility.editUser(req.user, req, res, false);
	}
}

export function deleteUser(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findByIdAndRemove({ _id: userId }, err => {
			if (err) return res.status(404).send();
			return res.status(200).send();
		});
	} else {
		return res.status(400).send();
	}
}

export function getAllUsers(req, res) {
	if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1)
		return res.status(401).send();
	UserSchema.find({ }, ((err, users) => {
		if (err) return res.status(404).send();
		return res.status(200).send({users});
	}));
}
