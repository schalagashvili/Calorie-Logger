import moment from 'moment-timezone';
const UserSchema = require('../models').userSchema;
const Utility = require('../services/utility');

const permissionLevel1 = ['admin'];
const permissionLevel2 = ['admin', 'manager'];

export function addMealLog(req, res) {
	const userId = req.params.userId;
	if (userId != null) {
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1) return res.status(401).send();
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
	if (userId != null) {
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1) return res.status(401).send();
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
	if (userId != null) {
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1) return res.status(401).send();
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
	let { fromDate, toDate, fromTime, toTime } = req.body;
	let mealLogs = [];
	if (userId != null) {
		UserSchema.findOne({ _id: userId }, (err, user) => {
			mealLogs = user.mealLog;
			mealLogs = mealLogs.sort(Utility.compareLogsByDates);
			mealLogs = mealLogs.filter(log => {
				if (moment(`${fromDate} ${fromTime}`) <= moment(log.date) <= moment(`${toDate} ${toTime}`)) {
					return log;
				}
			});
			const pageCount = Math.ceil(mealLogs.length / 10);
			let page = parseInt(req.body.page);
			if (!page) {
				page = 1;
			}
			if (page > pageCount) {
				page = pageCount;
			}
			return res.status(200).send({ logs: mealLogs.slice(page * 10 - 10, page * 10), logsCount: mealLogs.length });
		});
	} else {
		mealLogs = req.user.mealLog;
		mealLogs = mealLogs.sort(Utility.compareLogsByDates);
		mealLogs = mealLogs.filter(log => {
			if (moment(`${fromDate} ${fromTime}`) <= moment(log.date) && moment(log.date) <= moment(`${toDate} ${toTime}`)) {
				return log;
			}
		});
		const pageCount = Math.ceil(mealLogs.length / 10);
		let page = parseInt(req.body.page);
		if (!page) {
			page = 1;
		}
		if (page > pageCount) {
			page = pageCount;
		}
		return res.status(200).send({ logs: mealLogs.slice(page * 10 - 10, page * 10), logsCount: mealLogs.length });
	}
}

export function getUser(req, res) {
	const userId = req.params.userId;
	if (userId != null) {
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1) return res.status(401).send();
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
	if (userId != null) {
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1) return res.status(401).send();
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
	if (userId != null) {
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1) return res.status(401).send();
		UserSchema.findByIdAndRemove({ _id: userId }, err => {
			if (err) return res.status(404).send();
			return res.status(200).send();
		});
	} else {
		return res.status(400).send();
	}
}

export function getAllUsers(req, res) {
	if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1) return res.status(401).send();
	UserSchema.find({}, (err, users) => {
		if (err) return res.status(404).send();

		const pageCount = Math.ceil(users.length / 10);
		let page = parseInt(req.params.page);
		if (!page) {
			page = 1;
		}
		if (page > pageCount) {
			page = pageCount;
		}

		const reversedUsers = users.reverse();
		
		return res.status(200).send({ users: reversedUsers.slice(page * 10 - 10, page * 10), usersCount: users.length });
	});
}
