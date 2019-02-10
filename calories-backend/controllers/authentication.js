import Utility from '../services/utility';
const UserSchema = require('../models').userSchema;

export function signIn(req, res) {
	return res.status(200).send({ token: Utility.tokenForUser(req.user), role: req.user.role, email: req.user.email });
}

export function signUp(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	if (email == null || email == '' || !Utility.validateEmail(email)) {
		return res.status(422).send({ error: 'Please provide valid email' });
	}
	if (password == null || password.length < 6) {
		return res.status(422).send({ error: 'Password must contain at least 6 characters' });
	}
	UserSchema.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return res.status(500).send({ error: 'database error' });
		}
		if (existingUser) {
			return res.status(422).send({ error: 'Email is already used' });
		}
		const user = new UserSchema({
			email,
			password
		});
		user.save(function(err) {
			if (err) {
				return next(err);
			}
			return res.json({ token: Utility.tokenForUser(user), role: user.role });
		});
	});
}

export function createUser(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	let role = 'regular';
	if (req.body.role === 'admin') {
		if (req.user.role === 'admin') {
			role = req.body.role;
		}
	} else {
		role = req.body.role;
	}
	if (email == null || email == '' || !Utility.validateEmail(email)) {
		return res.status(422).send({ error: 'Please provide valid email' });
	}
	if (password == null || password.length < 6) {
		return res.status(422).send({ error: 'Password must contain at least 6 characters' });
	}
	UserSchema.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return res.status(500).send({ error: 'database error' });
		}
		if (existingUser) {
			return res.status(422).send({ error: 'Email is already used' });
		}
		const user = new UserSchema({
			email,
			password,
			role
		});
		user.save(function(err, newUser) {
			if (err) {
				return next(err);
			}
			return res.json({ token: Utility.tokenForUser(user), role: user.role, _id: newUser._id });
		});
	});
}
