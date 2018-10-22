import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

// Define user model
const userSchema = new Schema({
	email: { type: String, unique: true },
	password: { type: String },
	createdAt: { type: Date, default: new Date() },
	updatedAt: { type: Date, default: new Date() },
	expectedCalories: { type: Number },
	role: { type: String, default: 'regular' },
	mealLog: [
		{
			title: { type: String },
			date: { type: Date },
			calories: { type: Number}
		}
	]
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function (next) {
	// get access to the user model
	const user = this;
	// generate a salt then run callback
	bcrypt.genSalt(10, function (err, salt) {
		if (err) { return next(err); }
		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) { return next(err); }
			// overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

// Create the model class
const user = mongoose.model('User', userSchema);

// Export the user model
module.exports = user;
