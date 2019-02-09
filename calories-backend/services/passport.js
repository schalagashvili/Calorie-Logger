import passport from 'passport';
const UserSchema = require('../models').userSchema;
import secret from '../secret';
import { Strategy as JwtStrategy }  from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
	UserSchema.findOne({ email: email }, function (err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }
		user.comparePassword(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
});
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: secret
};
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	UserSchema.findById(payload.sub, function (err, user) {
		if (err) { return done(err, false); }
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);