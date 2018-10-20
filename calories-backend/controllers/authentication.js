import Utility from '../services/utility';
const UserSchema = require('../models').userSchema;

/* if the user is granted access then 200 is returned, otherwise 401 */
export function signIn(req, res) {
	// User has already had their email and password auth'd
	// We just need to give them a token
	return res.status(200).send({ token: Utility.tokenForUser(req.user), role: req.user.role });
}

export function signUp(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	// defensive validation check (maybe user bypassed frontend validation)
	if (email == null || email == '' || !Utility.validateEmail(email)) {
		return res.status(422).send({ error: 'Please provide valid email' });
	}
	if (password == null || password.length < 6) {
		return res.status(422).send({ error: 'Password must contain at least 6 characters' });
	}
	// See if a user with the given email exists
	UserSchema.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return res.status(500).send({ error: 'database error' });
		}
		// If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is already used' });
		}
		// If code came here it means that the email is free to take, so create and save a new user record
		const user = new UserSchema({
			email,
			password
		});

		user.save(function(err) {
			if (err) {
				return next(err);
			}
			// Repond to request indicating the user was created
			return res.json({ token: Utility.tokenForUser(user), role: user.role });
		});
	});
}
